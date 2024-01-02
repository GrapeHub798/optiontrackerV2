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
import { NewOption } from './newOption.model';
import { Option } from './option.model';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @UseGuards(AuthGuard)
  @Delete(':itemId')
  @HttpCode(HttpStatus.OK)
  delete(@Request() req: any, @Param() getOneItem: GetOneItem) {
    return this.optionsService.delete(req, getOneItem);
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
  @Get(':itemId')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
  ): Promise<Option> {
    return this.optionsService.getOne(req, getOneItem);
  }
}
