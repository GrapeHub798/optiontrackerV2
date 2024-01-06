import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { AccountValue } from './accountValue.model';
import { AccountValueByBroker } from './accountValueByBroker.model';
import { AnalysisService } from './analysis.service';
import { MostTradedStock } from './mostTradedStock.model';
import { PerformanceData } from './performanceData.model';
import { SingleTradeDay } from './singleTradeDay.model';
import { WinLossesByStock } from './winLossesByStock.model';
import { WinLossPercentage } from './winLossPercentage.model';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @UseGuards(AuthGuard)
  @Get('/accountValue')
  @HttpCode(HttpStatus.OK)
  getAccountValue(@Request() req: any): Promise<AccountValue> {
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
  @Get('/biggestLossByStock')
  @HttpCode(HttpStatus.OK)
  getBiggestLossByStock(@Request() req: any): Promise<MostTradedStock> {
    return this.analysisService.getBiggestLossByStock(req);
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
  getPerformanceByAmountData(@Request() req: any): Promise<PerformanceData> {
    return this.analysisService.getPerformanceByAmountData(req);
  }

  @UseGuards(AuthGuard)
  @Get('/performanceByTradeData')
  @HttpCode(HttpStatus.OK)
  getPerformanceByTradeData(@Request() req: any): Promise<PerformanceData> {
    return this.analysisService.getPerformanceByTradeData(req);
  }

  @UseGuards(AuthGuard)
  @Get('/tradesLast7')
  @HttpCode(HttpStatus.OK)
  getTradesPerDayLast7Days(@Request() req: any): Promise<SingleTradeDay[]> {
    return this.analysisService.getTradesPerDayLast7Days(req);
  }

  @UseGuards(AuthGuard)
  @Get('/tradesLast7Amount')
  @HttpCode(HttpStatus.OK)
  getTradesPerDayLast7DaysAmount(
    @Request() req: any,
  ): Promise<SingleTradeDay[]> {
    return this.analysisService.getTradesPerDayLast7DaysAmount(req);
  }

  @UseGuards(AuthGuard)
  @Get('/winLossByStock')
  @HttpCode(HttpStatus.OK)
  getWinLossByStock(@Request() req: any): Promise<WinLossesByStock[]> {
    return this.analysisService.getWinLossByStock(req);
  }

  @UseGuards(AuthGuard)
  @Get('/winLossPercentage')
  @HttpCode(HttpStatus.OK)
  getWinLossPercentage(@Request() req: any): Promise<WinLossPercentage> {
    return this.analysisService.getWinLossPercentage(req);
  }
}
