import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { Journal } from './journal.model';
import { JournalEntry } from './journalEntry.model';
import { JournalTradeId } from './journalTradeId.model';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal)
    private readonly journalModel: typeof Journal,
  ) {}

  async create(req: any, journalEntry: JournalEntry) {
    try {
      await this.journalModel.create({
        journalEntry: journalEntry.entry,
        tradeId: journalEntry.tradeId,
        userId: UserHelpers.getUserIdFromRequest(req),
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async delete(req: any, getOneItem: GetOneItem) {
    try {
      await this.journalModel.destroy({
        where: {
          journalId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async deleteMultiple(req: any, itemIds: DeleteMultiple) {
    try {
      await this.journalModel.destroy({
        where: {
          journalId: itemIds.itemIds,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async edit(req: any, getOneItem: GetOneItem, journalEntry: JournalEntry) {
    try {
      const journal = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Journal,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
      journal.journalEntry = journalEntry.entry;
      journal.tradeId = journalEntry.tradeId;

      await journal.save();

      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getAll(req: any): Promise<Journal[]> {
    try {
      return this.journalModel.findAll({
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async linkTrade(
    req: any,
    getOneItem: GetOneItem,
    journalTradeId: JournalTradeId,
  ) {
    try {
      const journal = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Journal,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
      journal.tradeId = journalTradeId.tradeId;

      await journal.save();

      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
  async unlinkTrade(req: any, getOneItem: GetOneItem) {
    try {
      const journal = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Journal,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );

      journal.tradeId = '';
      await journal.save();

      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
