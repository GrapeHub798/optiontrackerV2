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
import { NewOption } from './newOption.model';
import { Option } from './option.model';

@Injectable()
export class OptionsService {
  constructor(
    @InjectModel(Option)
    private readonly optionModel: typeof Option,
  ) {}

  async create(req: any, newOption: NewOption) {
    try {
      await this.optionModel.create({
        ...newOption,
        userId: UserHelpers.getUserIdFromRequest(req),
      });
      return true;
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

  async deleteMultiple(req: any, itemIds: DeleteMultiple) {
    try {
      await this.optionModel.destroy({
        where: {
          optionId: itemIds.itemIds,
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
      const option = await this.optionModel.findOne({
        where: {
          optionId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      if (!option) {
        throw new UnauthorizedException('Option not found');
      }
      await option.update(newOption);
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getAll(req: any, getAllPaginated: GetAllPaginated): Promise<Option[]> {
    try {
      const offset = getAllPaginated.limit * (getAllPaginated.page - 1);
      return await this.optionModel.findAll({
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

  async getOne(req: any, getOneItem: GetOneItem): Promise<Option> {
    try {
      return await this.optionModel.findOne({
        where: {
          optionId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
