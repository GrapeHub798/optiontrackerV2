import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as process from 'process';
import { map, Observable } from 'rxjs';

import { EodhdHelpers } from '../helpers/eodhdHelpers';
import { Stock } from '../stocks/stocks.model';
import { EodhdExchange } from './eodhdExchange.model';

const BASE_API_URL = 'https://eodhd.com/api/';
const API_TOKEN_QUERY_PARAM = '?api_token=';
const FORMAT_QUERY_PARAM = '&fmt=json';

@Injectable()
export class EodhdService {
  constructor(private readonly httpService: HttpService) {}

  getAllExchanges(): Observable<EodhdExchange[]> {
    const exchangesEndpoint = 'exchanges-list/';
    return this.httpService
      .get(
        `${BASE_API_URL}${exchangesEndpoint}${API_TOKEN_QUERY_PARAM}${process.env.EODHD_KEY}${FORMAT_QUERY_PARAM}`,
      )
      .pipe(
        map((axiosResponse) => {
          return EodhdHelpers.transformKeysToLowercase(axiosResponse.data);
        }),
      );
  }

  getTickersForCountry(exchangeCode: string): Observable<Stock[]> {
    const tickersEndpoint = 'exchange-symbol-list/';
    return this.httpService
      .get(
        `${BASE_API_URL}${tickersEndpoint}${exchangeCode}${API_TOKEN_QUERY_PARAM}${process.env.EODHD_KEY}${FORMAT_QUERY_PARAM}`,
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return EodhdHelpers.transformEodhdStockToStock(axiosResponse.data);
        }),
      );
  }
}
