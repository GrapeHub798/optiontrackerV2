import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserHelpers } from '../helpers/userHelpers';
import { NewPaginatedTable } from './newPaginatedTable.model';
import { PaginatedTableConfig } from './paginatedtableconfig.model';
import { PaginatedTableName } from './paginatedTableName.model';

@Injectable()
export class PaginatedTableConfigService {
  constructor(
    @InjectModel(PaginatedTableConfig)
    private readonly tableConfigModel: typeof PaginatedTableConfig,
  ) {}

  async create(req: any, newConfig: NewPaginatedTable): Promise<boolean> {
    try {
      await this.tableConfigModel.upsert({
        ...newConfig,
        userId: UserHelpers.getUserIdFromRequest(req),
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getTableConfig(
    req: any,
    paginatedTableName: PaginatedTableName,
  ): Promise<PaginatedTableConfig> {
    try {
      return await this.tableConfigModel.findOne({
        where: {
          tableName: paginatedTableName.tableName,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
