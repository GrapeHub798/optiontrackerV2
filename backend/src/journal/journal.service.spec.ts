import { expect, it } from '@jest/globals';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { GetOneItem } from '../universal/getSingle.model';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';
import { JournalEntry } from './journalEntry.model';
import { JournalTradeId } from './journalTradeId.model';

jest.mock('../helpers/dbHelpers');
jest.mock('../helpers/userHelpers');

describe('JournalService', () => {
  let service: JournalService;

  const mockJournalModel = {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockReturnJournalModel: Partial<Journal> = {
    date: new Date(),
    journalEntry: '',
    journalId: '',
    save: jest.fn(),
    tradeId: '',
    update: jest.fn(),
    userId: '',
  };

  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  const mockItem: GetOneItem = {
    itemId: '',
  };

  const userHelpersMock = UserHelpers as jest.Mocked<typeof UserHelpers>;
  userHelpersMock.getUserIdFromRequest.mockReturnValue(1); // assuming userId 1 for testing

  const dbHelpersMock = DbHelpers as jest.Mocked<typeof DbHelpers>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JournalService,
        {
          provide: getModelToken(Journal),
          useValue: mockJournalModel,
        },
      ],
    }).compile();

    service = module.get<JournalService>(JournalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('JournalService - create a journal entry', () => {
    it('should create a journal entry', async () => {
      const req = { user: { userId: 10 } } as any;
      const journalEntry = new JournalEntry();
      journalEntry.entry = 'Test entry';

      mockJournalModel.create.mockResolvedValue(true);

      expect(await service.create(req, journalEntry)).toBeTruthy();
    });

    it('should fail to create a journal entry', async () => {
      const req = { user: { userId: 10 } } as any;
      const journalEntry = new JournalEntry();
      journalEntry.entry = 'Test entry';

      mockJournalModel.create.mockResolvedValue(
        Promise.reject(new InternalServerErrorException('')),
      );

      await expect(service.create(req, journalEntry)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('JournalService - delete journal entry', () => {
    it('should delete a journal entry', async () => {
      mockJournalModel.findOne.mockResolvedValue({
        destroy: jest.fn().mockResolvedValue(true),
      });

      expect(await service.delete(req, mockItem)).toBeTruthy();
    });

    it('should fail to delete a journal entry', async () => {
      mockJournalModel.destroy.mockRejectedValue(new Error('Failed to delete'));
      await expect(service.delete(req, mockItem)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('JournalService - edit journal entry', () => {
    it('should edit a journal entry', async () => {
      const journalEntry = new JournalEntry();
      journalEntry.entry = 'Test entry';

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(mockReturnJournalModel as Journal),
      );

      expect(await service.edit(req, mockItem, journalEntry)).toBeTruthy();
    });

    it('should fail to edit a journal entry', async () => {
      const journalEntry = new JournalEntry();
      journalEntry.entry = 'Test entry';

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );

      await expect(service.edit(req, mockItem, journalEntry)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('JournalService - get all journal entries', () => {
    it('should get all journal entries', async () => {
      const journalEntries = [
        { entry: 'Entry 1', journalId: '1' },
        { entry: 'Entry 2', journalId: '2' },
      ];

      mockJournalModel.findAll.mockResolvedValue(journalEntries);

      expect(await service.getAll(req)).toEqual(journalEntries);
    });

    it('should fail to get all journal entries', async () => {
      const req = { user: { userId: 10 } } as any;

      mockJournalModel.findAll.mockResolvedValue(
        Promise.reject(new NotFoundException('Journal not found')),
      );

      await expect(service.getAll(req)).rejects.toThrow(NotFoundException);
    });
  });

  describe('JournalService - link journal entry', () => {
    it('should link a journal entry to a trade', async () => {
      const journalTradeId = new JournalTradeId();
      journalTradeId.tradeId = '456';

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(mockReturnJournalModel as Journal),
      );

      expect(
        await service.linkTrade(req, mockItem, journalTradeId),
      ).toBeTruthy();
    });

    it('should fail to link a journal entry to a trade', async () => {
      const journalTradeId = new JournalTradeId();
      journalTradeId.tradeId = '456';

      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );

      await expect(
        service.linkTrade(req, mockItem, journalTradeId),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('JournalService - unlink journal entry', () => {
    it('should unlink a journal entry from a trade', async () => {
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.resolve(mockReturnJournalModel as Journal),
      );

      expect(await service.unlinkTrade(req, mockItem)).toBeTruthy();
    });

    it('should fail to unlink a journal entry from a trade', async () => {
      dbHelpersMock.findRecordByPrimaryKeyAndUserId.mockReturnValue(
        Promise.reject(new Error('Primary key not found for the given model.')),
      );
      await expect(service.unlinkTrade(req, mockItem)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
