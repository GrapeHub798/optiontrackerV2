import { expect, it } from '@jest/globals';
import { InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewOption } from './newOption.model';
import { Option } from './option.model';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

jest.mock('./options.service');
jest.mock('../guards/auth.guard');

describe('controller', () => {
  let controller: OptionsController;
  let service: OptionsService;

  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  const newOption: NewOption = {
    expirationDate: new Date(),
    optionType: 1,
    strikePrice: 150,
    ticker: 'AAPL',
  };

  const getOneItem: GetOneItem = {
    itemId: 'testItemId',
  };

  const itemIds: DeleteMultiple = {
    itemIds: ['1', '2', '3'],
  };

  const getAllPaginated: GetAllPaginated = {
    limit: 2,
    page: 1,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OptionsController],
      providers: [OptionsService],
    }).compile();

    service = module.get<OptionsService>(OptionsService);
    controller = module.get<OptionsController>(OptionsController);
    jest.clearAllMocks();
  });

  describe('Option Controller - create', () => {
    it('should call the create with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(Promise.resolve(expectedResult));

      const result = await controller.create(req, newOption);
      expect(service.create).toHaveBeenCalledWith(req, newOption);
      expect(result).toBe(expectedResult);
    });

    it('should fail the create', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.create(req, newOption)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Option Controller - delete', () => {
    it('should call the delete with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(Promise.resolve(expectedResult));

      const result = await controller.delete(req, getOneItem);
      expect(service.delete).toHaveBeenCalledWith(req, getOneItem);
      expect(result).toBe(expectedResult);
    });

    it('should fail the delete', async () => {
      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.delete(req, getOneItem)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.delete).toHaveBeenCalledWith(req, getOneItem);
    });
  });

  describe('Option Controller - deleteMultiple', () => {
    it('should call the deleteMultiple with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(service, 'deleteMultiple')
        .mockResolvedValue(Promise.resolve(expectedResult));
      const results = await controller.deleteMultiple(req, itemIds);
      expect(service.deleteMultiple).toHaveBeenCalledWith(req, itemIds);
      expect(results).toBe(expectedResult);
    });

    it('should fail the deleteMultiple', async () => {
      jest
        .spyOn(service, 'deleteMultiple')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.deleteMultiple(req, itemIds)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.deleteMultiple).toHaveBeenCalledWith(req, itemIds);
    });
  });

  describe('Option Controller - edit', () => {
    it('should call the edit with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(service, 'edit')
        .mockResolvedValue(Promise.resolve(expectedResult));
      const results = await controller.edit(req, getOneItem, newOption);
      expect(service.edit).toHaveBeenCalledWith(req, getOneItem, newOption);
      expect(results).toBe(expectedResult);
    });

    it('should fail the edit', async () => {
      jest
        .spyOn(service, 'edit')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.edit(req, getOneItem, newOption)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.edit).toHaveBeenCalledWith(req, getOneItem, newOption);
    });
  });

  describe('Option Controller - getAll', () => {
    it('should call the get all with the correct parameters', async () => {
      const expectedResult = [];
      jest
        .spyOn(service, 'getAll')
        .mockResolvedValue(Promise.resolve(expectedResult));
      const results = await controller.getAll(req, getAllPaginated);
      expect(service.getAll).toHaveBeenCalledWith(req, getAllPaginated);
      expect(results).toBe(expectedResult);
    });

    it('should fail the get all request', async () => {
      jest
        .spyOn(service, 'getAll')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.getAll(req, getAllPaginated)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.getAll).toHaveBeenCalledWith(req, getAllPaginated);
    });
  });

  describe('Option Controller - getOne', () => {
    it('should call the get one with the correct parameters', async () => {
      const expectedResult: Partial<Option> = {
        expirationDate: new Date(),
        optionId: 'optionId',
        optionType: 1,
        strikePrice: 345,
        ticker: 'AMD',
        userId: 'userId',
      };

      jest
        .spyOn(service, 'getOne')
        .mockResolvedValue(Promise.resolve(expectedResult as Option));
      const result = await controller.getOne(req, getOneItem);
      expect(service.getOne).toHaveBeenCalledWith(req, getOneItem);
      expect(result).toBe(expectedResult);
    });

    it('should fail the get one request', async () => {
      jest
        .spyOn(service, 'getOne')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.getOne(req, getOneItem)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.getOne).toHaveBeenCalledWith(req, getOneItem);
    });
  });
});
