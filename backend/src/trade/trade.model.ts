import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Trade extends Model<Trade> {
  @Column({
    type: DataTypes.DATE,
  })
  buyDate: Date;

  @Column({
    type: DataTypes.DECIMAL(10, 2),
  })
  buyPrice: number;
  @Column
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
  stockId: string;
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  tradeId: string;
  @Column
  userId: string;
}
