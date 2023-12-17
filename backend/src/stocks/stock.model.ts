import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Stock extends Model<Stock> {
  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  country: string;

  @Column
  currency: string;

  @Column
  exchange: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  stockName: string;

  @Column
  stockType: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  ticker: string;
}
