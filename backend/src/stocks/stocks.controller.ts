import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { ExchangeCode } from './exchangeCode.model';
import { Stock } from './stocks.model';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Param() exchangeCode: ExchangeCode): Promise<Stock[]> {
    return this.stockService.getAll(exchangeCode);
  }

  @UseGuards(AuthGuard)
  @Get('refresh/:exchangeCode')
  @HttpCode(HttpStatus.OK)
  getStocks(@Param() exchangeCode: ExchangeCode) {
    return this.stockService.refreshStocks(exchangeCode);
  }
}
