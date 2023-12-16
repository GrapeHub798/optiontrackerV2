import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from 'rxjs';

import { EodhdService } from '../eodhdapi/eodhd.service';
import { DbHelpers } from '../helpers/dbHelpers';
import { ExchangeCode } from '../stocks/exchangeCode.model';
import { Exchange } from './exchanges.model';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectModel(Exchange)
    private readonly exchangeModel: typeof Exchange,
    private readonly eodhdService: EodhdService,
  ) {}

  async getAll(): Promise<Exchange[]> {
    const staticCode = 'US';
    try {
      return await this.exchangeModel.findAll({
        where: {
          code: staticCode,
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getSingleExchange(exchangeCode: ExchangeCode) {
    try {
      return this.exchangeModel.findOne({
        where: {
          code: exchangeCode.exchangeCode,
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async refreshExchanges() {
    try {
      const refreshComplete = new Subject<boolean>();
      this.eodhdService.getAllExchanges().subscribe((data) => {
        //we will chunk the data in case it's large
        const chunkSize = Number(process.env.DB_CHUNK_SIZE);
        const chunks = DbHelpers.chunkArray(data, chunkSize);
        chunks.forEach((chunk) => {
          this.exchangeModel.bulkCreate(chunk, {
            fields: [
              'code',
              'country',
              'countryISO2',
              'countryISO3',
              'currency',
              'name',
              'operatingMic',
            ],
            updateOnDuplicate: ['code'],
          });
        });
        refreshComplete.next(true);
        refreshComplete.complete();
      });
      return refreshComplete.asObservable();
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
