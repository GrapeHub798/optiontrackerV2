import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PaginatedTableConfigController } from './paginatedtableconfig.controller';
import { PaginatedTableConfig } from './paginatedtableconfig.model';
import { PaginatedTableConfigService } from './paginatedtableconfig.service';

@Module({
  controllers: [PaginatedTableConfigController],
  imports: [SequelizeModule.forFeature([PaginatedTableConfig])],
  providers: [PaginatedTableConfigService],
})
export class PaginatedTableConfigModule {}
