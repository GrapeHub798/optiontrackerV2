import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BrokerModule } from '../broker/broker.module';
import { OptionsModule } from '../options/options.module';
import { TradeController } from './trade.controller';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';

@Module({
  controllers: [TradeController],
  exports: [TradeService],
  imports: [SequelizeModule.forFeature([Trade]), OptionsModule, BrokerModule],
  providers: [TradeService],
})
export class TradeModule {}
