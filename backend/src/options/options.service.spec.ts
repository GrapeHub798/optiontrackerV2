import { expect } from '@jest/globals';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewOption } from './newOption.model';
import { Option } from './option.model';
import { OptionsService } from './options.service';

jest.mock('../helpers/dbHelpers');
jest.mock('../helpers/userHelpers');

describe('OptionsService', () => {
  let service: OptionsService;

  const req = { user: { userId: 10 } } as any;

  const newOption: NewOption = {
    expirationDate: new Date(),
    optionType: 1,
    strikePrice: 200,
    ticker: 'AAPL',
  };

  const getOneItem: GetOneItem = {
    itemId: 'item1',
  };

  const mockOptionModel = {
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
        OptionsService,
        {
          provide: getModelToken(Option),
          useValue: mockOptionModel,
        },
      ],
    }).compile();

    service = module.get<OptionsService>(OptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('OptionsService - create', () => {
    it('should create an option', async () => {
      mockOptionModel.create.mockResolvedValue(true);

      const result = await service.create(req, newOption);
      expect(result).toBeTruthy();
    });

    it('should fail to create an option', async () => {
      mockOptionModel.create.mockResolvedValue(
        Promise.reject(new InternalServerErrorException('')),
      );

      await expect(service.create(req, newOption)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('OptionsService - delete', () => {
    it('should delete an option', async () => {
      mockOptionModel.destroy.mockResolvedValue(true);

      const result = await service.delete(req, getOneItem);
      expect(result).toBeTruthy();
    });

    it('should fail to delete an option', async () => {
      mockOptionModel.destroy.mockResolvedValue(
        Promise.reject(new InternalServerErrorException('')),
      );

      await expect(service.delete(req, getOneItem)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('OptionsService - multiple delete', () => {
    it('should delete multiple options', async () => {
      const deleteMultiple: DeleteMultiple = {
        itemIds: ['item1', 'item2'],
      };

      mockOptionModel.destroy.mockResolvedValue(true);

      const result = await service.deleteMultiple(req, deleteMultiple);
      expect(result).toBeTruthy();
    });

    it('should fail to delete an option', async () => {
      const deleteMultiple: DeleteMultiple = {
        itemIds: ['item1', 'item2'],
      };

      mockOptionModel.destroy.mockResolvedValue(
        Promise.reject(new InternalServerErrorException('')),
      );

      await expect(service.deleteMultiple(req, deleteMultiple)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('OptionsService - edit', () => {
    it('should edit an option', async () => {
      const foundOption: Partial<Option> = {
        expirationDate: new Date(),
        optionType: 1,
        strikePrice: 200,
        ticker: 'AAPL',
        update: () => Promise.resolve(this),
      };

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(foundOption as Option),
      );

      const result = await service.edit(req, getOneItem, newOption);
      expect(result).toBeTruthy();
    });

    it('should fail to edit an option', async () => {
      const foundOption: Partial<Option> = {
        expirationDate: new Date(),
        optionType: 1,
        strikePrice: 200,
        ticker: 'AAPL',
        update: () => Promise.reject(new InternalServerErrorException('')),
      };

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(foundOption as Option),
      );

      await expect(service.edit(req, getOneItem, newOption)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw an error for non-existent option to edit', async () => {
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );

      await expect(service.edit(req, getOneItem, newOption)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('OptionsService - getAll', () => {
    it('should find all options', async () => {
      const getAllPaginated: GetAllPaginated = {
        limit: 10,
        page: 1,
      };

      const resultOptions: Partial<Option>[] = [
        {
          expirationDate: new Date(),
          optionType: 1,
          strikePrice: 200,
          ticker: 'AAPL',
        },
        {
          expirationDate: new Date(),
          optionType: 1,
          strikePrice: 200,
          ticker: 'AAPL',
        },
      ];

      mockOptionModel.findAll.mockResolvedValue(resultOptions);
      const options = await service.getAll(req, getAllPaginated);
      expect(Array.isArray(options)).toBe(true);
      expect(options.length).toBe(2);
    });

    it('should fail to find all options', async () => {
      const getAllPaginated: GetAllPaginated = {
        limit: 10,
        page: 1,
      };

      mockOptionModel.findAll.mockResolvedValue(
        Promise.reject(new NotFoundException('')),
      );

      await expect(service.getAll(req, getAllPaginated)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('OptionsService - getOne', () => {
    it('should find one option', async () => {
      const results: Partial<Option>[] = [
        {
          expirationDate: new Date(),
          optionType: 1,
          strikePrice: 200,
          ticker: 'AAPL',
        },
      ];

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(results as unknown as Option),
      );

      const option = await service.getOne(req, getOneItem);
      expect(option).toBeDefined();
      expect(Array.isArray(option)).toBe(true);
      expect(option[0].ticker).toEqual(results[0].ticker);
    });

    it('should fail to find one option', async () => {
      const req = { user: { userId: 10 } } as any;
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );

      await expect(service.getOne(req, getOneItem)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
