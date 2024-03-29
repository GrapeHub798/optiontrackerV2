import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { TradeService } from '../trade/trade.service';
import { GetOneItem } from '../universal/getSingle.model';
import { Broker } from './broker.model';
import { NewBroker } from './newbroker.model';

@Injectable()
export class BrokerService {
  constructor(
    @InjectModel(Broker)
    private readonly brokerModel: typeof Broker,
    private readonly tradeService: TradeService,
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
      //delete the trades associated with the broker
      const userId = UserHelpers.getUserIdFromRequest(req);
      await this.tradeService.deleteBrokerTrades(userId, getOneItem.itemId);
      await this.brokerModel.destroy({
        where: {
          brokerId: getOneItem.itemId,
          userId: userId,
        },
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async edit(req: any, getOneItem: GetOneItem, newBroker: NewBroker) {
    try {
      const broker = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Broker,
        UserHelpers.getUserIdFromRequest(req),
        getOneItem.itemId,
      );
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
