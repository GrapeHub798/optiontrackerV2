import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { Exchange } from './exchange.model';
import { ExchangesService } from './exchanges.service';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangeService: ExchangesService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Exchange[]> {
    return this.exchangeService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  getExchanges() {
    return this.exchangeService.refreshExchanges();
  }
}
