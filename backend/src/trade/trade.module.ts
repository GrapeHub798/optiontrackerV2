import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BrokerModule } from '../broker/broker.module';
import { StockOptionsModule } from '../stockoptions/stockoptions.module';
import { TradeController } from './trade.controller';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';

@Module({
  controllers: [TradeController],
  exports: [TradeService],
  imports: [
    SequelizeModule.forFeature([Trade]),
    StockOptionsModule,
    BrokerModule,
  ],
  providers: [TradeService],
})
export class TradeModule {}
