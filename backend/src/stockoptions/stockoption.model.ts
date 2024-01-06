import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';

import { Trade } from '../trade/trade.model';

@Table
export class StockOption extends Model<StockOption> {
  @Column
  expirationDate: Date;
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  optionId: string;

  @Column
  optionType: number;

  @Column({
    type: DataTypes.DECIMAL(10, 2),
  })
  strikePrice: number;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  ticker: string;

  @HasOne(() => Trade)
  trade: Trade;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  userId: string;
}
