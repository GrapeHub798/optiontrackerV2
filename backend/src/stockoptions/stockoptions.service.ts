import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { GetOneItem } from '../universal/getSingle.model';
import { NewStockOption } from './newOption.model';
import { StockOption } from './stockoption.model';

@Injectable()
export class StockOptionsService {
  constructor(
    @InjectModel(StockOption)
    private readonly optionModel: typeof StockOption,
  ) {}

  async create(userId: string, newOption: NewStockOption) {
    try {
      return await this.optionModel.create({
        ...newOption,
        userId: userId,
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async delete(req: any, getOneItem: GetOneItem) {
    try {
      await this.optionModel.destroy({
        where: {
          optionId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async edit(req: any, getOneItem: GetOneItem, newOption: NewStockOption) {
    try {
      const option = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        StockOption,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
      await option.update(newOption);
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getOne(req: any, getOneItem: GetOneItem): Promise<StockOption> {
    try {
      return await DbHelpers.findRecordByPrimaryKeyAndUserId(
        StockOption,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
