import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { OptionsService } from '../options/options.service';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { GetAllTrades } from './getAllTrades.model';
import { NewTrade } from './newTrade.model';
import { Trade } from './trade.model';

@Injectable()
export class TradeService {
  private calculateTotal = (trade: Partial<Trade>) => {
    const optionCalc = trade.optionId ? 100 : 1;
    const totalBuyPrice = trade.buyPrice * trade.quantity * optionCalc;
    const totalSellPrice = trade.sellPrice * trade.quantity * optionCalc;

    return totalSellPrice - totalBuyPrice;
  };
  constructor(
    @InjectModel(Trade)
    private readonly tradeModel: typeof Trade,
    private readonly optionService: OptionsService,
  ) {}
  async create(req: any, newTrade: NewTrade) {
    try {
      //get our user early
      const userId = UserHelpers.getUserIdFromRequest(req);
      const adjustedNewTrade: Partial<Trade> = { ...newTrade };
      //is this an option trade
      if (newTrade.isOption) {
        //pull out the option pieces and save them
        const newOption = {
          expirationDate: newTrade.expirationDate,
          optionType: newTrade.optionType,
          strikePrice: newTrade.strikePrice,
          ticker: newTrade.ticker,
        };
        //get the new optionid
        const option = await this.optionService.create(userId, newOption);
        adjustedNewTrade.optionId = option.optionId;
      }

      await this.tradeModel.create({
        ...adjustedNewTrade,
        tradeTotal: this.calculateTotal(adjustedNewTrade),
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

  async getAll(
    req: any,
    getAllPaginated: GetAllPaginated,
  ): Promise<GetAllTrades> {
    try {
      const offset = getAllPaginated.limit * (getAllPaginated.page - 1);
      const trades = await this.tradeModel.findAll({
        limit: getAllPaginated.limit,
        offset: offset,
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });

      const { count } = await this.tradeModel.findAndCountAll({
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return <GetAllTrades>{
        total: count,
        trades,
      };
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
