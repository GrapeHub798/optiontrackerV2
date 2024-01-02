import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';

jest.mock('../helpers/dbHelpers');
jest.mock('../helpers/userHelpers');

describe('TradeService', () => {
  let service: TradeService;

  const req = { user: { userId: 10 } } as any;

  const mockTradeModel = {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const userHelpersMock = UserHelpers as jest.Mocked<typeof UserHelpers>;
  userHelpersMock.getUserIdFromRequest.mockReturnValue(1);

  const dbHelpersMock = DbHelpers as jest.Mocked<typeof DbHelpers>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradeService,
        {
          provide: getModelToken(Trade),
          useValue: mockTradeModel,
        },
      ],
    }).compile();

    service = module.get<TradeService>(TradeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a trade', async () => {
      mockTradeModel.create.mockResolvedValue(true as any);

      const result = await service.create(req, {} as any);
      expect(result).toBeTruthy();
    });

    it('should throw an error if creation fails', async () => {
      mockTradeModel.create.mockRejectedValue(new Error('Failed to create'));

      await expect(service.create(req, {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('delete', () => {
    it('should successfully delete a trade', async () => {
      mockTradeModel.destroy.mockResolvedValue(1 as any);

      const result = await service.delete(req, { itemId: 'tradeId' } as any);
      expect(result).toBeTruthy();
    });

    it('should throw an error if delete fails', async () => {
      mockTradeModel.destroy.mockRejectedValue(new Error('Failed to delete'));

      await expect(
        service.delete(req, { itemId: 'tradeId' } as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteMultiple', () => {
    it('should successfully delete multiple trades', async () => {
      mockTradeModel.destroy.mockResolvedValue(1 as any);

      const result = await service.deleteMultiple(req, {
        itemIds: ['tradeId1', 'tradeId2'],
      } as any);
      expect(result).toBeTruthy();
    });

    it('should throw an error if delete fails', async () => {
      mockTradeModel.destroy.mockRejectedValue(
        new Error('Failed to delete multiple'),
      );

      await expect(
        service.deleteMultiple(req, {
          itemIds: ['tradeId1', 'tradeId2'],
        } as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('edit', () => {
    it('should successfully edit a trade', async () => {
      const mockTradeInstance = { update: jest.fn().mockResolvedValue(true) };

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve({
          update: jest.fn(),
        } as unknown as Trade),
      );

      const result = await service.edit(
        req,
        { itemId: 'tradeId' } as any,
        {} as any,
      );
      expect(result).toBeTruthy();
    });

    it('should throw UnauthorizedException if trade not found', async () => {
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );

      await expect(
        service.edit(req, { itemId: 'tradeId' } as any, {} as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getAll', () => {
    it('should return an array of trades', async () => {
      const mockTrades = [{}, {}]; // Array of trades
      mockTradeModel.findAll.mockResolvedValue(mockTrades as any);

      const result = await service.getAll(req, { limit: 10, page: 1 } as any);
      expect(result).toEqual(mockTrades);
    });

    it('should throw an error if find fails', async () => {
      mockTradeModel.findAll.mockRejectedValue(new Error('Failed to find'));

      await expect(
        service.getAll(req, { limit: 10, page: 1 } as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getOne', () => {
    it('should return a single trade', async () => {
      const mockTrade = {};

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(mockTrade as Trade),
      );

      const result = await service.getOne(req, { itemId: 'tradeId' } as any);
      expect(result).toEqual(mockTrade);
    });

    it('should throw an error if findOne fails', async () => {
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );
      await expect(
        service.getOne(req, { itemId: 'tradeId' } as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
