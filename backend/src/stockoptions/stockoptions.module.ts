import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StockOption } from './stockoption.model';
import { StockOptionsController } from './stockoptions.controller';
import { StockOptionsService } from './stockoptions.service';

@Module({
  controllers: [StockOptionsController],
  exports: [StockOptionsService],
  imports: [SequelizeModule.forFeature([StockOption])],
  providers: [StockOptionsService],
})
export class StockOptionsModule {}
