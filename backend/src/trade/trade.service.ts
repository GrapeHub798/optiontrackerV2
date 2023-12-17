import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserHelpers } from '../helpers/userHelpers';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewTrade } from './newTrade.model';
import { Trade } from './trade.model';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade)
    private readonly tradeModel: typeof Trade,
  ) {}

  async create(req: any, newTrade: NewTrade) {
    try {
      await this.tradeModel.create({
        ...newTrade,
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
      const trade = await this.tradeModel.findOne({
        where: {
          tradeId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      if (!trade) {
        throw new UnauthorizedException('Trade not found');
      }
      await trade.update(newTrade);
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
      return await this.tradeModel.findOne({
        where: {
          tradeId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
