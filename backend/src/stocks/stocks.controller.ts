import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { GetOneItem } from '../universal/getSingle.model';
import { ExchangeCode } from './exchangeCode.model';
import { Stock } from './stock.model';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @UseGuards(AuthGuard)
  @Get(':itemId')
  @HttpCode(HttpStatus.OK)
  getAll(@Param() getOneItem: GetOneItem): Promise<Stock[]> {
    return this.stockService.getAll(getOneItem);
  }

  @UseGuards(AuthGuard)
  @Get('refresh/:exchangeCode')
  @HttpCode(HttpStatus.OK)
  getStocks(@Param() exchangeCode: ExchangeCode) {
    return this.stockService.refreshStocks(exchangeCode);
  }
}
