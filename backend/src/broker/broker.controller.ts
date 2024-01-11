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
import { GetOneItem } from '../universal/getSingle.model';
import { Broker } from './broker.model';
import { BrokerService } from './broker.service';
import { NewBroker } from './newbroker.model';

@Controller('broker')
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Request() req: any, @Body() newBroker: NewBroker) {
    return this.brokerService.create(req, newBroker);
  }

  @UseGuards(AuthGuard)
  @Delete(':itemId')
  @HttpCode(HttpStatus.OK)
  delete(@Request() req: any, @Param() getOneItem: GetOneItem) {
    return this.brokerService.delete(req, getOneItem);
  }

  @UseGuards(AuthGuard)
  @Patch('/:itemId')
  @HttpCode(HttpStatus.OK)
  edit(
    @Request() req: any,
    @Param() getOneItem: GetOneItem,
    @Body() newBroker: NewBroker,
  ) {
    return this.brokerService.edit(req, getOneItem, newBroker);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Request() req: any): Promise<Broker[]> {
    return this.brokerService.getAll(req);
  }
}
