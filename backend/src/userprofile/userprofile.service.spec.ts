import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { Broker } from '../broker/broker.model';
import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { UserProfile } from './userprofile.model';
import { UserProfileService } from './userprofile.service';

jest.mock('../helpers/dbHelpers');
jest.mock('../helpers/userHelpers');

describe('TradeService', () => {
  let service: UserProfileService;

  const req = { user: { userId: 10 } } as any;

  const mockProfileModel = {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const userHelpersMock = UserHelpers as jest.Mocked<typeof UserHelpers>;
  userHelpersMock.getUserIdFromRequest.mockReturnValue(1); // assuming userId 1 for testing

  const dbHelpersMock = DbHelpers as jest.Mocked<typeof DbHelpers>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        {
          provide: getModelToken(UserProfile),
          useValue: mockProfileModel,
        },
      ],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a user profile', async () => {
      mockProfileModel.create.mockResolvedValue(true as any);

      const result = await service.create(req, {} as any);
      expect(result).toBeTruthy();
    });

    it('should throw an error if creation fails', async () => {
      mockProfileModel.create.mockRejectedValue(new Error('Failed to create'));

      await expect(service.create(req, {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('delete', () => {
    it('should successfully delete a user profile', async () => {
      mockProfileModel.destroy.mockResolvedValue(1 as any); // assuming 1 is the number of rows affected

      const result = await service.delete(req);
      expect(result).toBeTruthy();
    });

    it('should throw an error if delete fails', async () => {
      mockProfileModel.destroy.mockRejectedValue(new Error('Failed to delete'));

      await expect(service.delete(req)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('edit', () => {
    it('should successfully edit a user profile', async () => {
      const mockTradeInstance = { update: jest.fn().mockResolvedValue(true) };

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(mockTradeInstance as unknown as Broker),
      );

      const result = await service.edit(req, {} as any);
      expect(result).toBeTruthy();
    });

    it('should throw UnauthorizedException if trade not found', async () => {
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );

      await expect(service.edit(req, {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('get', () => {
    it('should return a user profile', async () => {
      const mockTrade = {}; // Single trade object

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(mockTrade as unknown as Broker),
      );

      const result = await service.get(req);
      expect(result).toEqual(mockTrade);
    });

    it('should throw an error if findOne fails', async () => {
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );
      await expect(service.get(req)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
