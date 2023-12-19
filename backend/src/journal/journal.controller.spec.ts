import { CanActivate, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../guards/auth.guard';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { JournalEntry } from './journalEntry.model';
import { JournalId } from './journalId.model';
import { JournalTradeId } from './journalTradeId.model';

describe('JournalController', () => {
  let journalController: JournalController;
  let journalService: JournalService;

  beforeEach(async () => {
    const mock_AuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const journalServiceMock = {
      create: jest.fn(),
      delete: jest.fn(),
      edit: jest.fn(),
      getAll: jest.fn(),
      linkTrade: jest.fn(),
      unlinkTrade: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalController],
      providers: [
        {
          provide: JournalService,
          useValue: journalServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_AuthGuard)
      .compile();

    journalController = module.get<JournalController>(JournalController);
    journalService = module.get<JournalService>(JournalService);
  });

  describe('JournalController - Create Journal Entry', () => {
    it('should create an entry', async () => {
      const result = true;
      jest
        .spyOn(journalService, 'create')
        .mockResolvedValue(Promise.resolve(result));

      expect(await journalController.create({}, new JournalEntry())).toBe(
        result,
      );
    });

    it('should fail to create an entry', async () => {
      jest
        .spyOn(journalService, 'create')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        journalController.create({}, new JournalEntry()),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('JournalController - Delete Journal Entry', () => {
    it('should delete an entry', async () => {
      const result = true;
      jest.spyOn(journalService, 'delete').mockResolvedValue(result);

      expect(await journalController.delete({}, new JournalId())).toBe(result);
    });

    it('should fail to delete an entry', async () => {
      jest
        .spyOn(journalService, 'delete')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        journalController.delete({}, new JournalId()),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('JournalController - Edit Journal Entry', () => {
    it('should edit an entry', async () => {
      const result = true;
      jest.spyOn(journalService, 'edit').mockResolvedValue(result);

      expect(
        await journalController.edit({}, new JournalId(), new JournalEntry()),
      ).toBe(result);
    });

    it('should fail to edit an entry', async () => {
      jest
        .spyOn(journalService, 'edit')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        journalController.edit({}, new JournalId(), new JournalEntry()),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('JournalController - Get All Journal Entries', () => {
    it('should get all entries', async () => {
      const result = [];
      jest.spyOn(journalService, 'getAll').mockResolvedValue(result);

      expect(await journalController.getAll({})).toBe(result);
    });

    it('should fail to get all entries', async () => {
      jest
        .spyOn(journalService, 'getAll')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(journalController.getAll({})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('JournalController - Link Journal Entry', () => {
    it('should link a trade/option', async () => {
      const result = true;
      jest.spyOn(journalService, 'linkTrade').mockResolvedValue(result);

      expect(
        await journalController.linkTrade(
          {},
          new JournalId(),
          new JournalTradeId(),
        ),
      ).toBe(result);
    });

    it('should fail to link a trade/option', async () => {
      jest
        .spyOn(journalService, 'linkTrade')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        journalController.linkTrade({}, new JournalId(), new JournalTradeId()),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('JournalController - Unlink Journal Entry', () => {
    it('should unlink a trade', async () => {
      const result = true;
      jest.spyOn(journalService, 'unlinkTrade').mockResolvedValue(result);

      expect(await journalController.unlinkTrade({}, new JournalId())).toBe(
        result,
      );
    });

    it('should fail to unlink a trade', async () => {
      jest
        .spyOn(journalService, 'unlinkTrade')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        journalController.unlinkTrade({}, new JournalId()),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
