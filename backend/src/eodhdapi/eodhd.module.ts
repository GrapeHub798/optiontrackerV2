import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EodhdService } from './eodhd.service';

@Module({
  exports: [EodhdService],
  imports: [HttpModule],
  providers: [EodhdService],
})
export class EodhdModule {}
