import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Option } from './option.model';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

@Module({
  controllers: [OptionsController],
  imports: [SequelizeModule.forFeature([Option])],
  providers: [OptionsService],
})
export class OptionsModule {}
