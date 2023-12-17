import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewTrade } from './newTrade.model';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Request() req: any, @Body() newTrade: NewTrade) {
    return this.tradeService.create(req, newTrade);
  }

  @UseGuards(AuthGuard)
  @Delete(':itemId')
  @HttpCode(HttpStatus.OK)
  delete(@Request() req: any, @Param() getOneItem: GetOneItem) {
    return this.tradeService.delete(req, getOneItem);
  }

  @UseGuards(AuthGuard)
  @Delete('/multiple')
  @HttpCode(HttpStatus.OK)
  deleteMultiple(@Request() req: any, @Body() itemIds: DeleteMultiple) {
    return this.tradeService.deleteMultiple(req, itemIds);
  }

  @UseGuards(AuthGuard)
  @Put(':itemId')
  @HttpCode(HttpStatus.OK)
  edit(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
    @Body() newTrade: NewTrade,
  ) {
    return this.tradeService.edit(req, getOneItem, newTrade);
  }

  @UseGuards(AuthGuard)
  @Get(':limit/:page')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Request() req: any,
    @Param() getAllPaginated: GetAllPaginated,
  ): Promise<Trade[]> {
    return this.tradeService.getAll(req, getAllPaginated);
  }

  @UseGuards(AuthGuard)
  @Get(':itemId')
  @HttpCode(HttpStatus.OK)
  getOne(@Request() req: any, @Param() getOneItem: GetOneItem): Promise<Trade> {
    return this.tradeService.getOne(req, getOneItem);
  }
}
