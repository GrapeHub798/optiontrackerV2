import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserHelpers } from '../helpers/userHelpers';
import { Journal } from './journal.model';
import { JournalEntry } from './journalEntry.model';
import { JournalId } from './journalId.model';
import { JournalTradeId } from './journalTradeId.model';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal)
    private readonly journalModel: typeof Journal,
  ) {}

  private async getJournalByUserAndId(journalId: string, userId: string) {
    const journal = await this.journalModel.findOne({
      where: { journalId, userId },
    });
    if (!journal) {
      return Promise.reject(new NotFoundException('Journal not found'));
    }

    return journal;
  }

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

  async delete(req: any, journalId: JournalId) {
    try {
      const journal = await this.getJournalByUserAndId(
        journalId.journalId,
        UserHelpers.getUserIdFromRequest(req),
      );
      await journal.destroy();
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
  async edit(req: any, journalId: JournalId, journalEntry: JournalEntry) {
    try {
      const journal = await this.getJournalByUserAndId(
        journalId.journalId,
        UserHelpers.getUserIdFromRequest(req),
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
    journalId: JournalId,
    journalTradeId: JournalTradeId,
  ) {
    try {
      const journal = await this.getJournalByUserAndId(
        journalId.journalId,
        UserHelpers.getUserIdFromRequest(req),
      );
      journal.tradeId = journalTradeId.tradeId;

      await journal.save();

      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
  async unlinkTrade(req: any, journalId: JournalId) {
    try {
      const journal = await this.getJournalByUserAndId(
        journalId.journalId,
        UserHelpers.getUserIdFromRequest(req),
      );

      journal.tradeId = '';
      await journal.save();

      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
