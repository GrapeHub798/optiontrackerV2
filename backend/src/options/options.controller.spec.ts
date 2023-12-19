import { expect, it } from '@jest/globals';
import { CanActivate, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AuthGuard } from '../guards/auth.guard';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewOption } from './newOption.model';
import { Option } from './option.model';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

describe('OptionsController', () => {
  let optionsController: OptionsController;
  let optionsService: OptionsService;

  // mock request object
  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  // mock NewOption object
  const newOption: NewOption = {
    expirationDate: new Date(),
    optionType: 1,
    strikePrice: 150,
    ticker: 'AAPL',
  };

  // mock GetOneItem object
  const getOneItem: GetOneItem = {
    itemId: 'testItemId',
  };

  // mock DeleteMultiple object
  const itemIds: DeleteMultiple = {
    itemIds: ['1', '2', '3'],
  };

  // mock GetAllPaginated object
  const getAllPaginated: GetAllPaginated = {
    limit: 2,
    page: 1,
  };

  beforeEach(async () => {
    const mock_AuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const optionsServiceMock = {
      create: jest.fn(),
      delete: jest.fn(),
      deleteMultiple: jest.fn(),
      edit: jest.fn(),
      getAll: jest.fn(),
      getOne: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [OptionsController],
      providers: [
        {
          provide: OptionsService,
          useValue: optionsServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_AuthGuard)
      .compile();

    optionsService = moduleRef.get<OptionsService>(OptionsService);
    optionsController = moduleRef.get<OptionsController>(OptionsController);
  });

  describe('OptionsController - create', () => {
    it('should call the create with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(optionsService, 'create')
        .mockResolvedValue(Promise.resolve(expectedResult));

      const result = await optionsController.create(req, newOption);
      expect(optionsService.create).toHaveBeenCalledWith(req, newOption);
      expect(result).toBe(expectedResult);
    });

    it('should fail the create', async () => {
      jest
        .spyOn(optionsService, 'create')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(optionsController.create(req, newOption)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('OptionsController - delete', () => {
    it('should call the delete with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(optionsService, 'delete')
        .mockResolvedValue(Promise.resolve(expectedResult));

      const result = await optionsController.delete(req, getOneItem);
      expect(optionsService.delete).toHaveBeenCalledWith(req, getOneItem);
      expect(result).toBe(expectedResult);
    });

    it('should fail the delete', async () => {
      jest
        .spyOn(optionsService, 'delete')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(optionsController.delete(req, getOneItem)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('OptionsController - deleteMultiple', () => {
    it('should call the deleteMultiple with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(optionsService, 'deleteMultiple')
        .mockResolvedValue(Promise.resolve(expectedResult));
      const results = await optionsController.deleteMultiple(req, itemIds);
      expect(optionsService.deleteMultiple).toHaveBeenCalledWith(req, itemIds);
      expect(results).toBe(expectedResult);
    });

    it('should fail the deleteMultiple', async () => {
      jest
        .spyOn(optionsService, 'deleteMultiple')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        optionsController.deleteMultiple(req, itemIds),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('OptionsController - edit', () => {
    it('should call the edit with the correct parameters', async () => {
      const expectedResult = true;
      jest
        .spyOn(optionsService, 'edit')
        .mockResolvedValue(Promise.resolve(expectedResult));
      const results = await optionsController.edit(req, getOneItem, newOption);
      expect(optionsService.edit).toHaveBeenCalledWith(
        req,
        getOneItem,
        newOption,
      );
      expect(results).toBe(expectedResult);
    });

    it('should fail the edit', async () => {
      jest
        .spyOn(optionsService, 'edit')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        optionsController.edit(req, getOneItem, newOption),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('OptionsController - getAll', () => {
    it('should call the get all with the correct parameters', async () => {
      const expectedResult = [];
      jest
        .spyOn(optionsService, 'getAll')
        .mockResolvedValue(Promise.resolve(expectedResult));
      const results = await optionsController.getAll(req, getAllPaginated);
      expect(optionsService.getAll).toHaveBeenCalledWith(req, getAllPaginated);
      expect(results).toBe(expectedResult);
    });

    it('should fail the get all request', async () => {
      jest
        .spyOn(optionsService, 'getAll')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        optionsController.getAll(req, getAllPaginated),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('OptionsController - getOne', () => {
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
        .spyOn(optionsService, 'getOne')
        .mockResolvedValue(Promise.resolve(expectedResult as Option));
      const result = await optionsController.getOne(req, getOneItem);
      expect(optionsService.getOne).toHaveBeenCalledWith(req, getOneItem);
      expect(result).toBe(expectedResult);
    });

    it('should fail the get one request', async () => {
      jest
        .spyOn(optionsService, 'getOne')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(optionsController.getOne(req, getOneItem)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
