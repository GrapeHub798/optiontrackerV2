import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { Broker } from './broker.model';
import { BrokerService } from './broker.service';

describe('Broker Service', () => {
  let service: BrokerService;

  const req = { user: { userId: 10 } } as any;

  const mockBrokerModel = {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrokerService,
        {
          provide: getModelToken(Broker),
          useValue: mockBrokerModel,
        },
      ],
    }).compile();

    service = module.get<BrokerService>(BrokerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a broker', async () => {
      mockBrokerModel.create.mockResolvedValue(true as any);

      const result = await service.create(req, {} as any);
      expect(result).toBeTruthy();
    });

    it('should throw an error if creation fails', async () => {
      mockBrokerModel.create.mockRejectedValue(new Error('Failed to create'));

      await expect(service.create(req, {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('edit', () => {
    it('should successfully edit a broker', async () => {
      const mockTradeInstance = { update: jest.fn().mockResolvedValue(true) };
      mockBrokerModel.findOne.mockResolvedValue(mockTradeInstance as any);

      const result = await service.edit(
        req,
        { itemId: 'brokerId' } as any,
        {} as any,
      );
      expect(result).toBeTruthy();
    });

    it('should throw UnauthorizedException if trade not found', async () => {
      mockBrokerModel.findOne.mockResolvedValue(null);

      await expect(
        service.edit(req, { itemId: 'tradeId' } as any, {} as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('delete', () => {
    it('should successfully delete a broker', async () => {
      mockBrokerModel.destroy.mockResolvedValue(1 as any); // assuming 1 is the number of rows affected

      const result = await service.delete(req, { itemId: 'brokerId' } as any);
      expect(result).toBeTruthy();
    });

    it('should throw an error if delete fails', async () => {
      mockBrokerModel.destroy.mockRejectedValue(new Error('Failed to delete'));

      await expect(
        service.delete(req, { itemId: 'brokerId' } as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getAll', () => {
    it('should return an array of trades', async () => {
      const mockTrades = [{}, {}]; // Array of trades
      mockBrokerModel.findAll.mockResolvedValue(mockTrades as any);

      const result = await service.getAll(req);
      expect(result).toEqual(mockTrades);
    });

    it('should throw an error if find fails', async () => {
      mockBrokerModel.findAll.mockRejectedValue(new Error('Failed to find'));

      await expect(service.getAll(req)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
