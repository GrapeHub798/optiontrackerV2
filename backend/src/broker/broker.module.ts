import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BrokerController } from './broker.controller';
import { Broker } from './broker.model';
import { BrokerService } from './broker.service';

@Module({
  controllers: [BrokerController],
  exports: [BrokerService],
  imports: [SequelizeModule.forFeature([Broker])],
  providers: [BrokerService],
})
export class BrokerModule {}
