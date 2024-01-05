import { Injectable, InternalServerErrorException } from '@nestjs/common';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { UserHelpers } from '../helpers/userHelpers';
import { AccountValue } from './accountValue.model';
import { AccountValueByBroker } from './accountValueByBroker.model';
import { MostTradedStock } from './mostTradedStock.model';
import { PerformanceData } from './performanceData.model';
import { SingleTradeDay } from './singleTradeDay.model';
import { WinLossesByStock } from './winLossesByStock.model';

@Injectable()
export class AnalysisService {
  constructor(private readonly sequelize: Sequelize) {}
  async getAccountValue(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const [data] = await this.sequelize.query(
        'SELECT SUM(t.tradeTotal) as total FROM trades t WHERE t.userId = :userId',
        {
          replacements: { userId: userId },
          type: sequelize.QueryTypes.SELECT,
        },
      );
      return data as AccountValue;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getAccountValueByBroker(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const data = await this.sequelize.query(
        'SELECT SUM(t.tradeTotal) as total, b.brokerName FROM trades t INNER JOIN brokers b ON t.brokerId = b.brokerId WHERE t.userId = :userId',
        {
          replacements: { userId: userId },
          type: sequelize.QueryTypes.SELECT,
        },
      );
      return data as AccountValueByBroker[];
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getBiggestLossesByStock(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      //let's the most traded and the total trades with it
      const [data] = await this.sequelize.query(
        `SELECT ticker, SUM(tradeTotal) AS total_losses, SUM(quantity) AS total_quantity FROM trades WHERE userId = :userId AND tradeTotal < 0 GROUP BY ticker ORDER BY total_losses ASC LIMIT 1;`,
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT },
      );
      return data as MostTradedStock;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getMostTradedByAmount(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      //let's the most traded and the total trades with it
      const [data] = await this.sequelize.query(
        `SELECT SUM(tradeTotal) as trades, ticker as stock FROM TRADES WHERE userId = :userId GROUP BY ticker ORDER BY SUM(tradeTotal) DESC LIMIT 1`,
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT },
      );
      return data as MostTradedStock;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getMostTradedByQuantity(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      //let's the most traded and the total trades with it
      const [data] = await this.sequelize.query(
        `SELECT SUM(quantity) as trades, ticker as stock FROM TRADES WHERE userId = :userId GROUP BY ticker ORDER BY SUM(quantity) DESC LIMIT 1`,
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT },
      );
      return data as MostTradedStock;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getMostTradedByTrades(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      //let's the most traded and the total trades with it
      const [data] = await this.sequelize.query(
        `SELECT count(ticker) as trades, ticker as stock FROM TRADES WHERE userId = :userId GROUP BY ticker ORDER BY COUNT(ticker) DESC LIMIT 1`,
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT },
      );
      return data as MostTradedStock;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getPerformanceByAmountData(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const [data] = await this.sequelize.query(
        'SELECT SUM(CASE WHEN tradeTotal = 0 THEN tradeTotal ELSE 0 END) as breakeven, SUM(CASE WHEN tradeTotal > 0 THEN tradeTotal ELSE 0 END) as gain, SUM(CASE WHEN tradeTotal < 0 THEN tradeTotal ELSE 0 END) as loss FROM trades WHERE userId = :userId',
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT },
      );
      return data as PerformanceData;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getPerformanceByTradeData(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const [data] = await this.sequelize.query(
        'SELECT SUM(CASE WHEN tradeTotal = 0 THEN 1 ELSE 0 END) as breakeven, SUM(CASE WHEN tradeTotal > 0 THEN 1 ELSE 0 END) as gain, SUM(CASE WHEN tradeTotal < 0 THEN 1 ELSE 0 END) as loss FROM trades WHERE userId = :userId',
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT },
      );
      return data as PerformanceData;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getTradesPerDayLast7Days(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const data = await this.sequelize.query(
        "SELECT DATE_FORMAT(sellDate, '%m/%d/%Y') as date_formatted, DATE_FORMAT(sellDate,'%a') as day_of_week, COUNT(*) as total FROM trades WHERE userId = :userId AND sellDate BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND DAYOFWEEK(sellDate) NOT IN (1, 7) GROUP BY DAYOFWEEK(sellDate), DATE_FORMAT(sellDate, '%m/%d/%Y') ORDER BY sellDate",
        {
          replacements: { userId: userId },
          type: sequelize.QueryTypes.SELECT,
        },
      );
      return data as SingleTradeDay[];
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getTradesPerDayLast7DaysAmount(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const data = await this.sequelize.query(
        "SELECT DATE_FORMAT(sellDate, '%m/%d/%Y') as date_formatted, DATE_FORMAT(sellDate,'%a') as day_of_week, SUM(tradeTotal) as total FROM trades WHERE userId = :userId AND sellDate BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND DAYOFWEEK(sellDate) NOT IN (1, 7) GROUP BY DAYOFWEEK(sellDate), DATE_FORMAT(sellDate, '%m/%d/%Y') ORDER BY sellDate",
        {
          replacements: { userId: userId },
          type: sequelize.QueryTypes.SELECT,
        },
      );
      return data as SingleTradeDay[];
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getWinsLossesByStock(req: any) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const data = await this.sequelize.query(
        'SELECT ticker, SUM(CASE WHEN tradeTotal > 0 THEN tradeTotal ELSE 0 END) AS gains, SUM(CASE WHEN tradeTotal < 0 THEN tradeTotal ELSE 0 END) AS losses FROM trades WHERE userId = :userId GROUP BY ticker',
        {
          replacements: { userId: userId },
          type: sequelize.QueryTypes.SELECT,
        },
      );
      return data as WinLossesByStock[];
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
