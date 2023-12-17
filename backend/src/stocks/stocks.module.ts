import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EodhdModule } from '../eodhdapi/eodhd.module';
import { ExchangesModule } from '../exchanges/exchanges.module';
import { StocksController } from './stocks.controller';
import { Stock } from './stock.model';
import { StocksService } from './stocks.service';

@Module({
  controllers: [StocksController],
  imports: [SequelizeModule.forFeature([Stock]), ExchangesModule, EodhdModule],
  providers: [StocksService],
})
export class StocksModule {}
