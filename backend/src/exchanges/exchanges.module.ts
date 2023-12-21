import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EodhdModule } from '../eodhdapi/eodhd.module';
import { Exchange } from './exchange.model';
import { ExchangesController } from './exchanges.controller';
import { ExchangesService } from './exchanges.service';

@Module({
  controllers: [ExchangesController],
  exports: [ExchangesService],
  imports: [SequelizeModule.forFeature([Exchange]), EodhdModule],
  providers: [ExchangesService],
})
export class ExchangesModule {}
