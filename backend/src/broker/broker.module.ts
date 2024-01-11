import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TradeModule } from '../trade/trade.module';
import { BrokerController } from './broker.controller';
import { Broker } from './broker.model';
import { BrokerService } from './broker.service';

@Module({
  controllers: [BrokerController],
  exports: [BrokerService],
  imports: [SequelizeModule.forFeature([Broker]), TradeModule],
  providers: [BrokerService],
})
export class BrokerModule {}
