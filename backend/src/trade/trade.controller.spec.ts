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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeController],
      providers: [TradeService],
    }).compile();

    controller = module.get<TradeController>(TradeController);
    service = module.get<TradeService>(TradeService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('should create a trade', async () => {
      const mockTrade: NewTrade = {
        buyDate: new Date(),
        buyPrice: 1,
        optionId: '',
        quantity: 1,
        sellDate: new Date(),
        sellPrice: 1,
        stockId: '',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.create(req, mockTrade);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });
  });

  describe('Delete', () => {
    it('should delete a trade', async () => {
      const mockItem: GetOneItem = {
        itemId: '',
      };

      jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.delete(req, mockItem);
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });
  });

  describe('Delete Multiple', () => {
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
  });

  describe('Edit', () => {
    it('should edit a trade', async () => {
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

      jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.edit(req, mockItem, mockTrade);
      expect(service.edit).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });
  });

  describe('Get All', () => {
    it('should get all trades', async () => {
      const mockPagination: GetAllPaginated = {
        limit: 1,
        page: 1,
      };

      const mockResults: Partial<Trade>[] = [
        {
          buyDate: new Date(),
          buyPrice: 1,
          optionId: '',
          quantity: 1,
          sellDate: new Date(),
          sellPrice: 1,
          stockId: '',
          userId: '',
        },
      ];

      jest
        .spyOn(service, 'getAll')
        .mockImplementation(() => Promise.resolve(mockResults as Trade[]));

      const results = await controller.getAll(req, mockPagination);
      expect(service.getAll).toHaveBeenCalledTimes(1);
      expect(Array.isArray(results)).toBeTruthy();
      expect(results.length).toBe(1);
    });
  });

  describe('Get One', () => {
    it('should get one trade', async () => {
      const mockItem: GetOneItem = {
        itemId: '',
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

      jest
        .spyOn(service, 'getOne')
        .mockImplementation(() => Promise.resolve(mockResults as Trade));

      const results = await controller.getOne(req, mockItem);
      expect(service.getOne).toHaveBeenCalledTimes(1);
      expect(results.sellPrice).toBe(1);
    });
  });
});
