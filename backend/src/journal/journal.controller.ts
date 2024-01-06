import {
  Body,
  Controller,
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
import { JournalService } from './journal.service';
import { JournalEntry } from './journalEntry.model';

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
  @Post('/multiple')
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
}
