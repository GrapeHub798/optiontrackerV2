import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserHelpers } from '../helpers/userHelpers';
import { GetOneItem } from '../universal/getSingle.model';
import { Broker } from './broker.model';
import { NewBroker } from './newbroker.model';

@Injectable()
export class BrokerService {
  constructor(
    @InjectModel(Broker)
    private readonly brokerModel: typeof Broker,
  ) {}

  async create(req: any, newBroker: NewBroker) {
    try {
      await this.brokerModel.create({
        ...newBroker,
        userId: UserHelpers.getUserIdFromRequest(req),
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async delete(req: any, getOneItem: GetOneItem) {
    try {
      await this.brokerModel.destroy({
        where: {
          brokerId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async edit(req: any, getOneItem: GetOneItem, newBroker: NewBroker) {
    try {
      const broker = await this.brokerModel.findOne({
        where: {
          brokerId: getOneItem.itemId,
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      if (!broker) {
        throw new NotFoundException('Broker not found');
      }
      await broker.update(newBroker);
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getAll(req: any): Promise<Broker[]> {
    try {
      return await this.brokerModel.findAll({
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
