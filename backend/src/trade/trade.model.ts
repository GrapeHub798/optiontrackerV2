import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Broker } from '../broker/broker.model';
import { Journal } from '../journal/journal.model';
import { Option } from '../options/option.model';

@Table
export class Trade extends Model<Trade> {
  @BelongsTo(() => Broker)
  broker: Broker;

  @ForeignKey(() => Broker)
  @Column({
    type: UUID,
  })
  brokerId: string;

  @Column({
    type: DataTypes.DATE,
  })
  buyDate: Date;
  @Column({
    type: DataTypes.DECIMAL(10, 2),
  })
  buyPrice: number;

  @BelongsTo(() => Journal)
  journal: Journal;

  @ForeignKey(() => Journal)
  @Column({
    allowNull: true, // This makes the association optional
    type: UUID,
  })
  journalId: string;

  @BelongsTo(() => Option)
  option: Option;

  @ForeignKey(() => Option)
  @Column({
    allowNull: true, // This makes the association optional
    type: UUID,
  })
  optionId: string;

  @Column
  quantity: number;
  @Column({
    type: DataTypes.DATE,
  })
  sellDate: Date;
  @Column({
    type: DataTypes.DECIMAL(10, 2),
  })
  sellPrice: number;
  @Column
  ticker: string;
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  tradeId: string;
  @Column({
    type: DataTypes.DECIMAL(10, 2),
  })
  tradeTotal: number;
  @Column
  userId: string;
}
