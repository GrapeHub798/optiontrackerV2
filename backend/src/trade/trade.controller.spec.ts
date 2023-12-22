import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewTrade } from './newTrade.model';
import { TradeController } from './trade.controller';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';

jest.mock('./trade.service');
jest.mock('../guards/auth.guard');

describe('Trade Controller', () => {
  let controller: TradeController;
  let service: TradeService;

  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  const mockItem: GetOneItem = {
    itemId: '',
  };

  const mockTrade: NewTrade = {
    buyDate: new Date(),
    buyPrice: 1,
    optionId: '',
    quantity: 1,
    sellDate: new Date(),
    sellPrice: 1,
    stockId: '',
  };

  const mockResults: Partial<Trade> = {
    buyDate: new Date(),
    buyPrice: 1,
    optionId: '',
    quantity: 1,
    sellDate: new Date(),
    sellPrice: 1,
    stockId: '',
    userId: '',
  };

  const mockResultsArray = [mockResults, mockResults];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeController],
      providers: [TradeService],
    }).compile();

    controller = module.get<TradeController>(TradeController);
    service = module.get<TradeService>(TradeService);
    jest.clearAllMocks();
  });

  describe('Trade Controller - Create', () => {
    it('should create a trade', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.create(req, mockTrade);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });

    it('should fail to create a trade', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.create(req, mockTrade)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trade Controller - Delete', () => {
    it('should delete a trade', async () => {
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.delete(req, mockItem);
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });

    it('should fail to delete a trade', async () => {
      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.delete(req, mockItem)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trade Controller - Delete Multiple', () => {
    it('should delete multiple trades', async () => {
      const mockItems: DeleteMultiple = {
        itemIds: ['item1', 'item2', 'item3'],
      };

      jest
        .spyOn(service, 'deleteMultiple')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.deleteMultiple(req, mockItems);
      expect(service.deleteMultiple).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });

    it('should fail to delete multiple trades', async () => {
      const mockItems: DeleteMultiple = {
        itemIds: ['item1', 'item2', 'item3'],
      };

      jest
        .spyOn(service, 'deleteMultiple')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.deleteMultiple(req, mockItems)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.deleteMultiple).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trade Controller - Edit', () => {
    it('should edit a trade', async () => {
      jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.edit(req, mockItem, mockTrade);
      expect(service.edit).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });

    it('should fail to edit a trade', async () => {
      jest
        .spyOn(service, 'edit')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.edit(req, mockItem, mockTrade)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.edit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trade Controller - Get All', () => {
    it('should get all trades', async () => {
      const mockPagination: GetAllPaginated = {
        limit: 1,
        page: 1,
      };

      jest
        .spyOn(service, 'getAll')
        .mockImplementation(() => Promise.resolve(mockResultsArray as Trade[]));

      const results = await controller.getAll(req, mockPagination);
      expect(service.getAll).toHaveBeenCalledTimes(1);
      expect(Array.isArray(results)).toBeTruthy();
      expect(results.length).toBe(2);
    });

    it('should fail to get all trades', async () => {
      const mockPagination: GetAllPaginated = {
        limit: 1,
        page: 1,
      };

      jest
        .spyOn(service, 'getAll')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.getAll(req, mockPagination)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trade Controller - Get One', () => {
    it('should get one trade', async () => {
      jest
        .spyOn(service, 'getOne')
        .mockImplementation(() => Promise.resolve(mockResults as Trade));

      const results = await controller.getOne(req, mockItem);
      expect(service.getOne).toHaveBeenCalledTimes(1);
      expect(results.sellPrice).toBe(1);
    });

    it('should fail to get one trade', async () => {
      jest
        .spyOn(service, 'getOne')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.getOne(req, mockItem)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.getOne).toHaveBeenCalledTimes(1);
    });
  });
});
