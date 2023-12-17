import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { EodhdService } from '../eodhdapi/eodhd.service';
import { ExchangesService } from '../exchanges/exchanges.service';
import { ExchangeCode } from './exchangeCode.model';
import { Stock } from './stock.model';
import { StocksService } from './stocks.service';

describe('StocksService', () => {
  let service: StocksService;
  const mockExchangesService = {
    getSingleExchange: jest.fn(),
  };
  const mockEodhdService = {
    getTickersForCountry: jest.fn(),
  };
  const mockStockModel = {
    bulkCreate: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        {
          provide: getModelToken(Stock),
          useValue: mockStockModel,
        },
        {
          provide: ExchangesService,
          useValue: mockExchangesService,
        },
        {
          provide: EodhdService,
          useValue: mockEodhdService,
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of stocks', async () => {
      const exchangeCode = { exchangeCode: 'NASDAQ' };
      const mockExchangeCode = new ExchangeCode();
      mockExchangeCode.exchangeCode = 'US';
      mockExchangesService.getSingleExchange.mockResolvedValue(
        mockExchangeCode,
      );
      mockStockModel.findAll.mockResolvedValue([]);

      await expect(service.getAll(exchangeCode)).resolves.toEqual([]);
    });

    it('should throw an internal server error', async () => {
      const exchangeCode = { exchangeCode: 'INVALID' };
      mockExchangesService.getSingleExchange.mockRejectedValue(
        new Error('Exchange not found'),
      );

      await expect(service.getAll(exchangeCode)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
