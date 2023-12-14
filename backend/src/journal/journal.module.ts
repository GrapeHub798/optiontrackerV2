import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Journal } from './journal.model';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';

@Module({
  imports: [SequelizeModule.forFeature([Journal])],
  providers: [JournalService],
  controllers: [JournalController],
})
export class JournalModule {}
