import {
  Body,
  Controller,
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
import { GetAllTrades } from './getAllTrades.model';
import { NewTrade } from './newTrade.model';
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
  @Post('/multiple')
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
  @Get(':limit/:page/:sortColumn?/:sortDirection?')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Request() req: any,
    @Param() getAllPaginated: GetAllPaginated,
  ): Promise<GetAllTrades> {
    return this.tradeService.getAll(req, getAllPaginated);
  }
}
