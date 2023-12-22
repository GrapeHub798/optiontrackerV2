import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { NewUserProfile } from './newUserProfile.model';
import { UserProfileController } from './userprofile.controller';
import { UserProfile } from './userprofile.model';
import { UserProfileService } from './userprofile.service';

jest.mock('./userprofile.service');
jest.mock('../guards/auth.guard');

describe('User Profile Controler', () => {
  let controller: UserProfileController;
  let service: UserProfileService;

  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [UserProfileService],
    }).compile();

    controller = module.get<UserProfileController>(UserProfileController);
    service = module.get<UserProfileService>(UserProfileService);
    jest.clearAllMocks();
  });

  describe('User Profile Controller - Create', () => {
    it('should create a user profile', async () => {
      const mockProfile: NewUserProfile = {
        preferredExchange: '',
        preferredLanguage: '',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.create(req, mockProfile);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });

    it('should fail to create a user profile', async () => {
      const mockProfile: NewUserProfile = {
        preferredExchange: '',
        preferredLanguage: '',
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.create(req, mockProfile)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Profile Controller - Delete', () => {
    it('should delete a user profile', async () => {
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.delete(req);
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });

    it('should fail to delete a user profile', async () => {
      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.delete(req)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Profile Controller - Edit', () => {
    it('should edit a user profile', async () => {
      const mockProfile: NewUserProfile = {
        preferredExchange: '',
        preferredLanguage: '',
      };

      jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(true));

      const results = await controller.edit(req, mockProfile);
      expect(service.edit).toHaveBeenCalledTimes(1);
      expect(results).toEqual(true);
    });

    it('should fail edit a user profile', async () => {
      const mockProfile: NewUserProfile = {
        preferredExchange: '',
        preferredLanguage: '',
      };

      jest
        .spyOn(service, 'edit')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.edit(req, mockProfile)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.edit).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Profile Controller - Get', () => {
    it('should get a user profile', async () => {
      const mockResults: Partial<UserProfile> = {
        preferredExchange: '',
        preferredLanguage: '',
        userId: '',
      };

      jest
        .spyOn(service, 'get')
        .mockImplementation(() => Promise.resolve(mockResults as UserProfile));

      const results = await controller.get(req);
      expect(service.get).toHaveBeenCalledTimes(1);
      expect(results.userId).toBe('');
    });

    it('should get a user profile', async () => {
      jest
        .spyOn(service, 'get')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.get(req)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.get).toHaveBeenCalledTimes(1);
    });
  });
});
