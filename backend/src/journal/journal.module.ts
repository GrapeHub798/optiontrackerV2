import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TradeModule } from '../trade/trade.module';
import { JournalController } from './journal.controller';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';

@Module({
  controllers: [JournalController],
  exports: [JournalService],
  imports: [SequelizeModule.forFeature([Journal]), TradeModule],
  providers: [JournalService],
})
export class JournalModule {}
