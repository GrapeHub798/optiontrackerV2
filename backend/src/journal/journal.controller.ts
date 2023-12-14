import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';
import { JournalEntry } from './journalEntry.model';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Request() req: any): Promise<Journal[]> {
    return this.journalService.getAll(req);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  @HttpCode(HttpStatus.OK)
  create(@Request() req: any, @Body() journalEntry: JournalEntry) {
    return this.journalService.create(req, journalEntry);
  }
}
