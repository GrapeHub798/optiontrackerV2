import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { GetOneItem } from '../universal/getSingle.model';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { JournalEntry } from './journalEntry.model';
import { JournalTradeId } from './journalTradeId.model';

jest.mock('./journal.service');
jest.mock('../guards/auth.guard');

describe('JournalController', () => {
  let controller: JournalController;
  let service: JournalService;

  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  const mockItem: GetOneItem = {
    itemId: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalController],
      providers: [JournalService],
    }).compile();

    controller = module.get<JournalController>(JournalController);
    service = module.get<JournalService>(JournalService);
    jest.clearAllMocks();
  });

  describe('Journal Controller - Create Journal Entry', () => {
    it('should create an entry', async () => {
      const result = true;
      jest.spyOn(service, 'create').mockResolvedValue(Promise.resolve(result));

      expect(await controller.create(req, new JournalEntry())).toBe(result);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should fail to create an entry', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.create(req, new JournalEntry())).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Journal Controller - Delete Journal Entry', () => {
    it('should delete an entry', async () => {
      const result = true;
      jest.spyOn(service, 'delete').mockResolvedValue(result);

      expect(await controller.delete(req, mockItem)).toBe(result);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });

    it('should fail to delete an entry', async () => {
      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.delete(req, mockItem)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('Journal Controller - Edit Journal Entry', () => {
    it('should edit an entry', async () => {
      const result = true;
      jest.spyOn(service, 'edit').mockResolvedValue(result);

      expect(await controller.edit(req, mockItem, new JournalEntry())).toBe(
        result,
      );
      expect(service.edit).toHaveBeenCalledTimes(1);
    });

    it('should fail to edit an entry', async () => {
      jest
        .spyOn(service, 'edit')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        controller.edit(req, mockItem, new JournalEntry()),
      ).rejects.toThrow(InternalServerErrorException);
      expect(service.edit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Journal Controller - Get All Journal Entries', () => {
    it('should get all entries', async () => {
      const result = [];
      jest.spyOn(service, 'getAll').mockResolvedValue(result);

      expect(await controller.getAll(req)).toBe(result);
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });

    it('should fail to get all entries', async () => {
      jest
        .spyOn(service, 'getAll')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.getAll(req)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Journal Controller - Link Journal Entry', () => {
    it('should link a trade/option', async () => {
      const result = true;
      jest.spyOn(service, 'linkTrade').mockResolvedValue(result);

      expect(
        await controller.linkTrade(req, mockItem, new JournalTradeId()),
      ).toBe(result);
      expect(service.linkTrade).toHaveBeenCalledTimes(1);
    });

    it('should fail to link a trade/option', async () => {
      jest
        .spyOn(service, 'linkTrade')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(
        controller.linkTrade(req, mockItem, new JournalTradeId()),
      ).rejects.toThrow(InternalServerErrorException);
      expect(service.linkTrade).toHaveBeenCalledTimes(1);
    });
  });

  describe('Journal Controller - Unlink Journal Entry', () => {
    it('should unlink a trade', async () => {
      const result = true;
      jest.spyOn(service, 'unlinkTrade').mockResolvedValue(result);

      expect(await controller.unlinkTrade(req, mockItem)).toBe(result);
      expect(service.unlinkTrade).toHaveBeenCalledTimes(1);
    });

    it('should fail to unlink a trade', async () => {
      jest
        .spyOn(service, 'unlinkTrade')
        .mockResolvedValue(
          Promise.reject(new InternalServerErrorException('')),
        );

      await expect(controller.unlinkTrade(req, mockItem)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.unlinkTrade).toHaveBeenCalledTimes(1);
    });
  });
});
