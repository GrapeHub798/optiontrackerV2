import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OptionsModule } from '../options/options.module';
import { TradeController } from './trade.controller';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';

@Module({
  controllers: [TradeController],
  imports: [SequelizeModule.forFeature([Trade]), OptionsModule],
  providers: [TradeService],
})
export class TradeModule {}
