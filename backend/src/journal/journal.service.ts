import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { TradeService } from '../trade/trade.service';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { Journal } from './journal.model';
import { JournalEntry } from './journalEntry.model';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal)
    private readonly journalModel: typeof Journal,
    private readonly tradeService: TradeService,
  ) {}

  async create(req: any, journalEntry: JournalEntry) {
    try {
      const trade = await this.tradeService.getOne(req, journalEntry.tradeId);

      const userId = UserHelpers.getUserIdFromRequest(req);
      const newJournalEntry = await this.journalModel.create({
        journalEntry: journalEntry.entry,
        trade,
        userId,
      });

      //update the trade too
      await this.tradeService.attachJournalEntry(
        userId,
        trade.tradeId,
        newJournalEntry.journalId,
      );

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
      const trade = await this.tradeService.getOne(req, journalEntry.tradeId);
      const journal = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Journal,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
      journal.journalEntry = journalEntry.entry;
      journal.trade = trade;

      await journal.save();

      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
