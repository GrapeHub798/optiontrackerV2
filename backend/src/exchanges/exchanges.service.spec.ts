import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { EodhdService } from '../eodhdapi/eodhd.service';
import { DbHelpers } from '../helpers/dbHelpers';
import { Exchange } from './exchange.model';
import { ExchangesService } from './exchanges.service';

jest.mock('../eodhdapi/eodhd.service');
jest.mock('../helpers/dbHelpers');

describe('ExchangesService', () => {
  let service: ExchangesService;
  let mockExchangeModel;
  let eodhdServiceMock;
  let httpServiceMock;

  const dbHelpersMock = DbHelpers as jest.Mocked<typeof DbHelpers>;

  beforeEach(async () => {
    mockExchangeModel = {
      bulkCreate: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
    };

    eodhdServiceMock = new EodhdService(httpServiceMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangesService,
        {
          provide: getModelToken(Exchange),
          useValue: mockExchangeModel,
        },
        {
          provide: EodhdService,
          useValue: eodhdServiceMock,
        },
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    service = module.get<ExchangesService>(ExchangesService);
  });

  describe('getAll method', () => {
    it('should return all exchanges with static code US', async () => {
      const mockExchanges = [
        { code: 'US', name: 'Exchange1' },
        { code: 'US', name: 'Exchange2' },
      ];
      mockExchangeModel.findAll.mockResolvedValue(mockExchanges);
      await expect(service.getAll()).resolves.toEqual(mockExchanges);
    });

    it('should throw an InternalServerErrorException if retrieval fails', async () => {
      mockExchangeModel.findAll.mockRejectedValue(
        new Error('Retrieval failed'),
      );
      await expect(service.getAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getSingleExchange method', () => {
    const exchangeCode = { exchangeCode: 'US' };

    it('should return a single exchange based on exchangeCode', async () => {
      const mockExchange = { code: 'US', name: 'Exchange1' };
      mockExchangeModel.findOne.mockResolvedValue(mockExchange);
      await expect(service.getSingleExchange(exchangeCode)).resolves.toEqual(
        mockExchange,
      );
    });

    it('should throw an InternalServerErrorException if retrieval fails', async () => {
      mockExchangeModel.findOne.mockRejectedValue(
        new InternalServerErrorException('Retrieval failed'),
      );
      await expect(service.getSingleExchange(exchangeCode)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('refreshExchanges method', () => {
    it('should complete the refresh of exchanges', async () => {
      eodhdServiceMock.getAllExchanges.mockReturnValue(
        of([{ code: 'US', name: 'Exchange1' }]),
      );
      dbHelpersMock.chunkArray.mockReturnValue([]);

      mockExchangeModel.bulkCreate.mockRejectedValue(true);

      const results = await service.refreshExchanges();
      expect(results).toBeTruthy();
    });

    it('should handle errors properly', async () => {
      eodhdServiceMock.getAllExchanges.mockImplementation(() => {
        throw new InternalServerErrorException('Refresh failed');
      });

      try {
        await service.refreshExchanges();
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
