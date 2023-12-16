import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';
import { JournalEntry } from './journalEntry.model';
import { JournalId } from './journalId.model';
import { JournalTradeId } from './journalTradeId.model';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  @HttpCode(HttpStatus.OK)
  create(@Request() req: any, @Body() journalEntry: JournalEntry) {
    return this.journalService.create(req, journalEntry);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:journalId')
  @HttpCode(HttpStatus.OK)
  delete(@Request() req: any, @Param() journalId: JournalId) {
    return this.journalService.delete(req, journalId);
  }

  @UseGuards(AuthGuard)
  @Patch('edit/:journalId')
  @HttpCode(HttpStatus.OK)
  edit(
    @Request() req: any,
    @Param() journalId: JournalId,
    @Body() journalEntry: JournalEntry,
  ) {
    return this.journalService.edit(req, journalId, journalEntry);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Request() req: any): Promise<Journal[]> {
    return this.journalService.getAll(req);
  }

  @UseGuards(AuthGuard)
  @Patch('linkTrade/:journalId')
  @HttpCode(HttpStatus.OK)
  linkTrade(
    @Request() req: any,
    @Param() journalId: JournalId,
    @Body() journalTradeId: JournalTradeId,
  ) {
    return this.journalService.linkTrade(req, journalId, journalTradeId);
  }

  @UseGuards(AuthGuard)
  @Patch('unlinkTrade/:journalId')
  @HttpCode(HttpStatus.OK)
  unlinkTrade(@Request() req: any, @Param() journalId: JournalId) {
    return this.journalService.unlinkTrade(req, journalId);
  }
}
