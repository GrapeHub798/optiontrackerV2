import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { NewOption } from './newOption.model';
import { Option } from './option.model';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Request() req: any, @Body() newOption: NewOption) {
    return this.optionsService.create(req, newOption);
  }
  @UseGuards(AuthGuard)
  @Delete(':itemId')
  @HttpCode(HttpStatus.OK)
  delete(@Request() req: any, @Param() getOneItem: GetOneItem) {
    return this.optionsService.delete(req, getOneItem);
  }

  @UseGuards(AuthGuard)
  @Post('/multiple')
  @HttpCode(HttpStatus.OK)
  deleteMultiple(@Request() req: any, @Body() itemIds: DeleteMultiple) {
    return this.optionsService.deleteMultiple(req, itemIds);
  }

  @UseGuards(AuthGuard)
  @Put(':itemId')
  @HttpCode(HttpStatus.OK)
  edit(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
    @Body() newOption: NewOption,
  ) {
    return this.optionsService.edit(req, getOneItem, newOption);
  }

  @UseGuards(AuthGuard)
  @Get(':limit/:page')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Request() req: any,
    @Param() getAllPaginated: GetAllPaginated,
  ): Promise<Option[]> {
    return this.optionsService.getAll(req, getAllPaginated);
  }

  @UseGuards(AuthGuard)
  @Get(':itemId')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
  ): Promise<Option> {
    return this.optionsService.getOne(req, getOneItem);
  }
}
