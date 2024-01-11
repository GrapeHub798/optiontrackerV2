import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { literal, Order } from 'sequelize';

import { Broker } from '../broker/broker.model';
import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { Journal } from '../journal/journal.model';
import { StockOption } from '../stockoptions/stockoption.model';
import { StockOptionsService } from '../stockoptions/stockoptions.service';
import { GetAllPaginated } from '../universal/getAllPaginated.model';
import { DeleteMultiple } from '../universal/getMultiple.model';
import { GetOneItem } from '../universal/getSingle.model';
import { GetAllTrades } from './getAllTrades.model';
import { NewTrade } from './newTrade.model';
import { Trade } from './trade.model';

@Injectable()
export class TradeService {
  private calculateTotal = (trade: Partial<Trade>, broker: Broker) => {
    const optionCalc = trade.optionId ? 100 : 1;
    //this will be more complicated as we add trade types
    //get the fee
    const brokerFee = trade.optionId
      ? broker.brokerOptionFee
      : broker.brokerStockFee;
    console.log(brokerFee);
    const calculatedBrokerFee = trade.quantity * 2 * brokerFee;
    const totalBuyPrice = trade.buyPrice * trade.quantity * optionCalc;
    const totalSellPrice = trade.sellPrice * trade.quantity * optionCalc;

    return totalSellPrice - totalBuyPrice - calculatedBrokerFee;
  };
  constructor(
    @InjectModel(Trade)
    private readonly tradeModel: typeof Trade,
    @InjectModel(Broker)
    private readonly brokerModel: typeof Broker,
    @InjectModel(Journal)
    private readonly journalModel: typeof Journal,
    private readonly optionService: StockOptionsService,
  ) {}

  async attachJournalEntry(userId: string, tradeId: string, journalId: string) {
    try {
      const trade = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Trade,
        userId,
        tradeId,
      );

      //add the journal entry
      await trade.update({
        journalId,
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async create(req: any, newTrade: NewTrade) {
    try {
      //get our user early
      const userId = UserHelpers.getUserIdFromRequest(req);
      const adjustedNewTrade: Partial<Trade> = { ...newTrade };
      //is this an option trade
      if (newTrade.isOption) {
        //pull out the option pieces and save them
        const newOption = {
          expirationDate: newTrade.expirationDate,
          optionType: newTrade.optionType,
          strikePrice: newTrade.strikePrice,
          ticker: newTrade.ticker,
        };
        //get the new optionid
        const option = await this.optionService.create(userId, newOption);
        adjustedNewTrade.optionId = option.optionId;
      }

      //we need to deal with brokerage fees
      const broker = await this.brokerModel.findOne({
        where: {
          brokerId: adjustedNewTrade.brokerId,
          userId,
        },
      });
      await this.tradeModel.create({
        ...adjustedNewTrade,
        tradeTotal: this.calculateTotal(adjustedNewTrade, broker),
        userId: UserHelpers.getUserIdFromRequest(req),
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteBrokerTrades(userId: string, brokerId: string) {
    try {
      const foundTrades = await this.tradeModel.findAll({
        attributes: ['tradeId'],
        where: {
          brokerId,
          userId,
        },
      });

      const tradeIds = foundTrades.map((singleTrade) => singleTrade.tradeId);
      await this.deleteMultipleTrades(userId, tradeIds);
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async deleteMultiple(req: any, itemIds: DeleteMultiple) {
    return await this.deleteMultipleTrades(
      UserHelpers.getUserIdFromRequest(req),
      itemIds.itemIds,
    );
  }

  async deleteMultipleTrades(userId: string, tradeIds: string[]) {
    try {
      //get all the options for the trades
      const optionTrades = await this.tradeModel.findAll({
        attributes: ['optionId'],
        where: {
          tradeId: tradeIds,
          userId,
        },
      });
      const optionIds = optionTrades.map((singleTrade) => singleTrade.optionId);
      await this.optionService.deleteOptionsForTrades(userId, optionIds);

      //the journals
      const journalTrades = await this.tradeModel.findAll({
        attributes: ['journalId'],
        where: {
          tradeId: tradeIds,
          userId,
        },
      });
      const journalIds = journalTrades.map(
        (singleJournal) => singleJournal.journalId,
      );
      await this.journalModel.destroy({
        where: {
          journalId: journalIds,
          userId: userId,
        },
      });

      await this.tradeModel.destroy({
        where: {
          tradeId: tradeIds,
          userId,
        },
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async detachJournalId(userId: string, journalIds: string[]) {
    try {
      await this.tradeModel.update(
        {
          journalId: null,
        },
        {
          where: {
            journalId: journalIds,
            userId: userId,
          },
        },
      );
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async edit(req: any, getOneItem: GetOneItem, newTrade: NewTrade) {
    try {
      const userId = UserHelpers.getUserIdFromRequest(req);
      const adjustedNewTrade: Partial<Trade> = { ...newTrade };
      //is this an option trade
      if (newTrade.isOption) {
        //pull out the option pieces and save them
        const newOption = {
          expirationDate: newTrade.expirationDate,
          optionType: newTrade.optionType,
          strikePrice: newTrade.strikePrice,
          ticker: newTrade.ticker,
        };
        //get the new optionid
        const option = await this.optionService.create(userId, newOption);
        adjustedNewTrade.optionId = option.optionId;
      }

      //we need to deal with brokerage fees
      const broker = await this.brokerModel.findOne({
        where: {
          brokerId: adjustedNewTrade.brokerId,
          userId,
        },
      });

      const trade = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Trade,
        userId,
        getOneItem.itemId,
      );
      await trade.update({
        ...adjustedNewTrade,
        tradeTotal: this.calculateTotal(adjustedNewTrade, broker),
      });
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getAll(
    req: any,
    getAllPaginated: GetAllPaginated,
  ): Promise<GetAllTrades> {
    try {
      const sortDirection = getAllPaginated.sortDirection || 'DESC';
      const sortColumn = getAllPaginated.sortColumn || 'createdAt';

      const tableToModel = {
        broker: Broker,
        journal: Journal,
        stockoption: StockOption,
      };

      const defaultOrderBy: ({ as: string; model: any } | string)[][] = [
        [sortColumn, sortDirection],
      ];
      let customOrderBy: ({ as: string; model: any } | string)[][] = [];
      if (sortColumn.includes('.')) {
        //split it up and determine the model
        const sortColumnPieces = sortColumn.split('.');
        const neededModel = tableToModel[sortColumnPieces[0]];
        customOrderBy = [
          [
            { as: sortColumnPieces[0], model: neededModel },
            sortColumnPieces[1],
            sortDirection,
          ],
        ];
      }

      const orderBy: ({ as: string; model: any } | string)[][] =
        customOrderBy?.length > 0 ? customOrderBy : defaultOrderBy;

      const offset = getAllPaginated.limit * getAllPaginated.page;
      const trades = await this.tradeModel.findAll({
        attributes: {
          include: [
            [
              sequelize.fn(
                'DATE_FORMAT',
                sequelize.col('Trade.createdAt'),
                '%d-%m-%Y',
              ),
              'createdAt',
            ],
            [
              sequelize.fn(
                'DATE_FORMAT',
                sequelize.col('Trade.buyDate'),
                '%d-%m-%Y',
              ),
              'buyDate',
            ],
            [
              sequelize.fn(
                'DATE_FORMAT',
                sequelize.col('Trade.sellDate'),
                '%d-%m-%Y',
              ),
              'sellDate',
            ],
          ],
        },
        include: [
          {
            model: Broker,
          },
          {
            attributes: {
              include: [
                [
                  literal(
                    `CASE WHEN optionType = 1 THEN 'CALL' WHEN optionType = 2 THEN 'PUT' END`,
                  ),
                  'optionType',
                ],
              ],
            },
            model: StockOption,
          },
          {
            as: 'journal',
            model: Journal,
          },
        ],
        limit: +getAllPaginated.limit,
        offset: +offset,
        order: orderBy as Order,
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });

      const { count } = await this.tradeModel.findAndCountAll({
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return <GetAllTrades>{
        total: count,
        trades,
      };
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async getOne(req: any, tradeId: string) {
    try {
      return await DbHelpers.findRecordByPrimaryKeyAndUserId(
        Trade,
        UserHelpers.getUserIdFromRequest(req),
        tradeId,
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
