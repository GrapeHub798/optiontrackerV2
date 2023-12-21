import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { UserProfile } from './userprofile.model';
import { UserProfileService } from './userprofile.service';

describe('TradeService', () => {
  let service: UserProfileService;

  const req = { user: { userId: 10 } } as any;

  const mockProfileModel = {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

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
      mockProfileModel.findOne.mockResolvedValue(mockTradeInstance as any);

      const result = await service.edit(req, {} as any);
      expect(result).toBeTruthy();
    });

    it('should throw UnauthorizedException if trade not found', async () => {
      mockProfileModel.findOne.mockResolvedValue(null);

      await expect(service.edit(req, {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('get', () => {
    it('should return a user profile', async () => {
      const mockTrade = {}; // Single trade object
      mockProfileModel.findOne.mockResolvedValue(mockTrade as any);

      const result = await service.get(req);
      expect(result).toEqual(mockTrade);
    });

    it('should throw an error if findOne fails', async () => {
      mockProfileModel.findOne.mockRejectedValue(
        new Error('Failed to find one'),
      );
      ``;
      await expect(service.get(req)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
