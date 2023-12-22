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
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';
import { JournalEntry } from './journalEntry.model';
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
  @Delete(':itemId')
  @HttpCode(HttpStatus.OK)
  delete(@Request() req: any, @Param() getOneItem: GetOneItem) {
    return this.journalService.delete(req, getOneItem);
  }

  @UseGuards(AuthGuard)
  @Delete('/multiple')
  @HttpCode(HttpStatus.OK)
  deleteMultiple(@Request() req: any, @Body() itemIds: DeleteMultiple) {
    return this.journalService.deleteMultiple(req, itemIds);
  }

  @UseGuards(AuthGuard)
  @Patch('edit/:journalId')
  @HttpCode(HttpStatus.OK)
  edit(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
    @Body() journalEntry: JournalEntry,
  ) {
    return this.journalService.edit(req, getOneItem, journalEntry);
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
    @Param() getOneItem: GetOneItem,
    @Body() journalTradeId: JournalTradeId,
  ) {
    return this.journalService.linkTrade(req, getOneItem, journalTradeId);
  }

  @UseGuards(AuthGuard)
  @Patch('unlinkTrade/:journalId')
  @HttpCode(HttpStatus.OK)
  unlinkTrade(@Request() req: any, @Param() getOneItem: GetOneItem) {
    return this.journalService.unlinkTrade(req, getOneItem);
  }
}
