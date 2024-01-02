import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { ExchangeCode } from './exchangeCode.model';
import { Stock } from './stock.model';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

jest.mock('./stocks.service');
jest.mock('../guards/auth.guard');

describe('StocksController', () => {
  let controller: StocksController;
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [StocksService],
    }).compile();

    controller = module.get<StocksController>(StocksController);
    service = module.get<StocksService>(StocksService);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return an array of stocks', async () => {
      const mockExchangeCode: ExchangeCode = {
        exchangeCode: 'US',
      };
      const mockStocks: Partial<Stock>[] = [
        {
          country: '',
          currency: '',
          exchange: '',
          stockName: '',
          stockType: '',
          ticker: '',
        },
        {
          country: '',
          currency: '',
          exchange: '',
          stockName: '',
          stockType: '',
          ticker: '',
        },
      ];

      jest
        .spyOn(service, 'getAll')
        .mockResolvedValue(Promise.resolve(mockStocks as Stock[]));

      expect(await controller.getAll(mockExchangeCode)).toBe(mockStocks);
      expect(service.getAll).toHaveBeenCalledWith(mockExchangeCode);
    });
  });

  describe('getStocks', () => {
    it('should refresh and return stocks', async () => {
      const mockExchangeCode: ExchangeCode = {
        exchangeCode: 'US',
      };

      jest
        .spyOn(service, 'refreshStocks')
        .mockResolvedValue(
          Promise.resolve(true as unknown as Observable<boolean>),
        );

      expect(await controller.getStocks(mockExchangeCode)).toBe(true);
      expect(service.refreshStocks).toHaveBeenCalledWith(mockExchangeCode);
    });
  });
});
