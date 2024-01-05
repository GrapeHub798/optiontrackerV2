import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { AccountValueByBroker } from './accountValueByBroker.model';
import { AnalysisService } from './analysis.service';
import { MostTradedStock } from './mostTradedStock.model';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @UseGuards(AuthGuard)
  @Get('/accountValue')
  @HttpCode(HttpStatus.OK)
  getAccountValue(@Request() req: any) {
    return this.analysisService.getAccountValue(req);
  }

  @UseGuards(AuthGuard)
  @Get('/accountValueByBroker')
  @HttpCode(HttpStatus.OK)
  getAccountValueByBroker(
    @Request() req: any,
  ): Promise<AccountValueByBroker[]> {
    return this.analysisService.getAccountValueByBroker(req);
  }

  @UseGuards(AuthGuard)
  @Get('/mostTradedByAmount')
  @HttpCode(HttpStatus.OK)
  getMostTradedByAmount(@Request() req: any): Promise<MostTradedStock> {
    return this.analysisService.getMostTradedByAmount(req);
  }

  @UseGuards(AuthGuard)
  @Get('/mostTradedByQuantity')
  @HttpCode(HttpStatus.OK)
  getMostTradedByQuantity(@Request() req: any): Promise<MostTradedStock> {
    return this.analysisService.getMostTradedByQuantity(req);
  }

  @UseGuards(AuthGuard)
  @Get('/mostTradedByTrades')
  @HttpCode(HttpStatus.OK)
  getMostTradedByTrades(@Request() req: any): Promise<MostTradedStock> {
    return this.analysisService.getMostTradedByTrades(req);
  }

  @UseGuards(AuthGuard)
  @Get('/performanceByAmountData')
  @HttpCode(HttpStatus.OK)
  getPerformanceByAmountData(@Request() req: any) {
    return this.analysisService.getPerformanceByAmountData(req);
  }

  @UseGuards(AuthGuard)
  @Get('/performanceByTradeData')
  @HttpCode(HttpStatus.OK)
  getPerformanceByTradeData(@Request() req: any) {
    return this.analysisService.getPerformanceByTradeData(req);
  }

  @UseGuards(AuthGuard)
  @Get('/tradesLast7')
  @HttpCode(HttpStatus.OK)
  getTradesPerDayLast7Days(@Request() req: any) {
    return this.analysisService.getTradesPerDayLast7Days(req);
  }

  @UseGuards(AuthGuard)
  @Get('/tradesLast7Amount')
  @HttpCode(HttpStatus.OK)
  getTradesPerDayLast7DaysAmount(@Request() req: any) {
    return this.analysisService.getTradesPerDayLast7DaysAmount(req);
  }

  @UseGuards(AuthGuard)
  @Get('/winslossesByStock')
  @HttpCode(HttpStatus.OK)
  getWinsLossesByStock(@Request() req: any) {
    return this.analysisService.getWinsLossesByStock(req);
  }
}
