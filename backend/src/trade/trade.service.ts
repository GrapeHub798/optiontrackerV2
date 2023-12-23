import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewTrade } from './newTrade.model';
import { Trade } from './trade.model';

@Injectable()
export class TradeService {
  private calculateTotal = (newTrade: NewTrade) => {
    const totalBuyPrice = newTrade.buyPrice * newTrade.quantity;
    const totalSellPrice = newTrade.sellPrice * newTrade.quantity;

    return totalSellPrice - totalBuyPrice;
  };
  constructor(
    @InjectModel(Trade)
    private readonly tradeModel: typeof Trade,
  ) {}
  async create(req: any, newTrade: NewTrade) {
    try {
      //do the total calculation

      await this.tradeModel.create({
        ...newTrade,
        tradeTotal: this.calculateTotal(newTrade),
        userId: UserHelpers.getUserIdFromRequest(req),
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async delete(req: any, getOneItem: GetOneItem) {
    try {
      await this.tradeModel.destroy({
        where: {
          tradeId: getOneItem.itemId,
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
      await this.tradeModel.destroy({
        where: {
          tradeId: itemIds.itemIds,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async edit(req: any, getOneItem: GetOneItem, newTrade: NewTrade) {
    try {
      const trade = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Trade,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
      await trade.update({
        ...newTrade,
        tradeTotal: this.calculateTotal(newTrade),
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getAll(req: any, getAllPaginated: GetAllPaginated): Promise<Trade[]> {
    try {
      const offset = getAllPaginated.limit * (getAllPaginated.page - 1);
      return await this.tradeModel.findAll({
        limit: getAllPaginated.limit,
        offset: offset,
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getOne(req: any, getOneItem: GetOneItem): Promise<Trade> {
    try {
      return await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Trade,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
