import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { GetOneItem } from '../universal/getSingle.model';
import { NewOption } from './newOption.model';
import { Option } from './option.model';

@Injectable()
export class OptionsService {
  constructor(
    @InjectModel(Option)
    private readonly optionModel: typeof Option,
  ) {}

  async create(userId: string, newOption: NewOption) {
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

  async edit(req: any, getOneItem: GetOneItem, newOption: NewOption) {
    try {
      const option = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Option,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
      await option.update(newOption);
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getOne(req: any, getOneItem: GetOneItem): Promise<Option> {
    try {
      return await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Option,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
