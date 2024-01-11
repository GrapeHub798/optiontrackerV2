import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Broker } from '../broker/broker.model';
import { Journal } from '../journal/journal.model';
import { StockOptionsModule } from '../stockoptions/stockoptions.module';
import { TradeController } from './trade.controller';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';

@Module({
  controllers: [TradeController],
  exports: [TradeService],
  imports: [
    SequelizeModule.forFeature([Trade, Journal, Broker]),
    StockOptionsModule,
  ],
  providers: [TradeService],
})
export class TradeModule {}
