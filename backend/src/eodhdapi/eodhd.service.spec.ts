import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { Stock } from '../stocks/stock.model';
import { EodhdService } from './eodhd.service';
import { EodhdExchange } from './eodhdExchange.model';

describe('EodhdService', () => {
  let service: EodhdService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EodhdService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EodhdService>(EodhdService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should get all exchanges', (done) => {
    const data: EodhdExchange[] = [];
    const result: AxiosResponse = {
      config: {
        headers: undefined,
      },
      data: data,
      headers: {},
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'get').mockReturnValue(of(result));
    service.getAllExchanges().subscribe({
      error: (error) => done(error),
      next: (response) => {
        expect(response).toStrictEqual(result.data);
        done();
      },
    });
  });

  it('should get all tickers for an exchange', (done) => {
    const data: Stock[] = [];
    const result: AxiosResponse = {
      config: {
        headers: undefined,
      },
      data: data,
      headers: {},
      status: 200,
      statusText: 'OK',
    };
    const exchangeCode = 'exchangeCode';
    jest.spyOn(httpService, 'get').mockReturnValue(of(result));
    service.getTickersForCountry(exchangeCode).subscribe({
      error: (error) => done(error),
      next: (response) => {
        expect(response).toStrictEqual(result.data);
        done();
      },
    });
  });
});
