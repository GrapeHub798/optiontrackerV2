import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { take } from 'rxjs';

import { EodhdService } from '../eodhdapi/eodhd.service';
import { DbHelpers } from '../helpers/dbHelpers';
import { GetOneItem } from '../universal/getSingle.model';
import { Exchange } from './exchange.model';

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

  async getSingleExchange(getOneItem: GetOneItem) {
    try {
      return this.exchangeModel.findOne({
        where: {
          code: getOneItem.itemId,
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async refreshExchanges(): Promise<boolean> {
    try {
      await this.exchangeModel.destroy({
        truncate: true,
        where: {},
      });

      return new Promise((resolve) => {
        this.eodhdService
          .getAllExchanges()
          .pipe(take(1))
          .subscribe({
            complete: () =>
              console.info('Successfully Retrieved Exchange info'),
            error: (e) => {
              console.log(e);
              throw new InternalServerErrorException(e.message);
            },
            next: (data) => {
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
              resolve(true);
            },
          });
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
