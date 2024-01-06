import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { GetOneItem } from '../universal/getSingle.model';
import { NewStockOption } from './newOption.model';
import { StockOption } from './stockoption.model';
import { StockOptionsService } from './stockoptions.service';

@Controller('options')
export class StockOptionsController {
  constructor(private readonly optionsService: StockOptionsService) {}

  @UseGuards(AuthGuard)
  @Delete(':itemId')
  @HttpCode(HttpStatus.OK)
  delete(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
  ): Promise<boolean> {
    return this.optionsService.delete(req, getOneItem);
  }

  @UseGuards(AuthGuard)
  @Put(':itemId')
  @HttpCode(HttpStatus.OK)
  edit(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
    @Body() newOption: NewStockOption,
  ): Promise<boolean> {
    return this.optionsService.edit(req, getOneItem, newOption);
  }

  @UseGuards(AuthGuard)
  @Get(':itemId')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
  ): Promise<StockOption> {
    return this.optionsService.getOne(req, getOneItem);
  }
}
