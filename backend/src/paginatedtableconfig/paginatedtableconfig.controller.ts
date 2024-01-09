import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { NewPaginatedTable } from './newPaginatedTable.model';
import { PaginatedTableConfig } from './paginatedtableconfig.model';
import { PaginatedTableConfigService } from './paginatedtableconfig.service';
import { PaginatedTableName } from './paginatedTableName.model';

@Controller('paginatedTableConfig')
export class PaginatedTableConfigController {
  constructor(
    private readonly paginatedTableConfigService: PaginatedTableConfigService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  create(
    @Request() req: any,
    @Body() newConfig: NewPaginatedTable,
  ): Promise<boolean> {
    return this.paginatedTableConfigService.create(req, newConfig);
  }

  @UseGuards(AuthGuard)
  @Get('/:tableName')
  @HttpCode(HttpStatus.OK)
  getTableConfig(
    @Request() req: any,
    @Param() paginatedTableName: PaginatedTableName,
  ): Promise<PaginatedTableConfig> {
    return this.paginatedTableConfigService.getTableConfig(
      req,
      paginatedTableName,
    );
  }
}
