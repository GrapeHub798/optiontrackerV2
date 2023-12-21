import { Test, TestingModule } from '@nestjs/testing';

import { GetOneItem } from '../universal/getSingle.model';
import { BrokerController } from './broker.controller';
import { Broker } from './broker.model';
import { BrokerService } from './broker.service';
import { NewBroker } from './newbroker.model';

jest.mock('./broker.service');
jest.mock('../guards/auth.guard');

describe('Broker Controler', () => {
  let controller: BrokerController;
  let service: BrokerService;

  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerController],
      providers: [BrokerService],
    }).compile();

    controller = module.get<BrokerController>(BrokerController);
    service = module.get<BrokerService>(BrokerService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('should create a broker', async () => {
      const mockNewBroker: NewBroker = {
        brokerName: '',
        brokerOptionFee: 1,
        brokerStockFee: 1,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.create(req, mockNewBroker);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });
  });

  describe('Delete', () => {
    it('should delete a broker', async () => {
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

  describe('Edit', () => {
    it('should edit a broker', async () => {
      const mockItem: GetOneItem = {
        itemId: '',
      };

      const mockNewBroker: NewBroker = {
        brokerName: '',
        brokerOptionFee: 1,
        brokerStockFee: 1,
      };

      jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.edit(req, mockItem, mockNewBroker);
      expect(service.edit).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });
  });

  describe('Get All', () => {
    it('should get all brokers', async () => {
      const mockResults: Partial<Broker>[] = [
        {
          brokerId: '',
          brokerName: '',
          brokerOptionFee: 1,
          brokerStockFee: 1,
          userId: '',
        },
        {
          brokerId: '',
          brokerName: '',
          brokerOptionFee: 1,
          brokerStockFee: 1,
          userId: '',
        },
      ];

      jest
        .spyOn(service, 'getAll')
        .mockImplementation(() => Promise.resolve(mockResults as Broker[]));

      const results = await controller.getAll(req);
      expect(service.getAll).toHaveBeenCalledTimes(1);
      expect(Array.isArray(results)).toBeTruthy();
      expect(results.length).toBe(2);
    });
  });
});
