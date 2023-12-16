import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from 'rxjs';

import { EodhdService } from '../eodhdapi/eodhd.service';
import { Exchange } from '../exchanges/exchanges.model';
import { ExchangesService } from '../exchanges/exchanges.service';
import { DbHelpers } from '../helpers/dbHelpers';
import { ExchangeCode } from './exchangeCode.model';
import { Stock } from './stocks.model';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel(Stock)
    private readonly stockModel: typeof Stock,
    private readonly exchangeService: ExchangesService,
    private readonly eodhdService: EodhdService,
  ) {}

  private getCountryFromExchange(exchange: Exchange) {
    return exchange.country;
  }

  private async getExchangeFromExchangeCode(exchangeCode: ExchangeCode) {
    return this.exchangeService.getSingleExchange(exchangeCode);
  }

  async getAll(exchangeCode: ExchangeCode): Promise<Stock[]> {
    try {
      const exchange = await this.getExchangeFromExchangeCode(exchangeCode);
      const exchangeCountry = this.getCountryFromExchange(exchange);
      return await this.stockModel.findAll({
        where: {
          country: exchangeCountry,
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async refreshStocks(exchangeCode: ExchangeCode) {
    try {
      const refreshComplete = new Subject<boolean>();
      //reach out to api
      this.eodhdService
        .getTickersForCountry(exchangeCode.exchangeCode)
        .subscribe((data) => {
          //we will chunk the data in case it's large
          const chunkSize = Number(process.env.DB_CHUNK_SIZE);
          const chunks = DbHelpers.chunkArray(data, chunkSize);

          chunks.forEach((chunk) => {
            this.stockModel.bulkCreate(chunk, {
              fields: [
                'country',
                'currency',
                'exchange',
                'stockName',
                'stockType',
                'ticker',
              ],
              updateOnDuplicate: ['ticker'],
            });
          });
          refreshComplete.next(true);
          refreshComplete.complete();
        });
      return refreshComplete.asObservable();
    } catch (e) {
      console.log(e);
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
