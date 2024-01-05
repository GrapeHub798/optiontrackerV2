import { Module } from '@nestjs/common';

import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

@Module({
  controllers: [AnalysisController],
  imports: [],
  providers: [AnalysisService],
})
export class AnalysisModule {}
