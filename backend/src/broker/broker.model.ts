import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Broker extends Model<Broker> {
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  brokerId: string;
  @Column
  brokerName: string;
  @Column({
    defaultValue: 0.0,
    type: DataTypes.DECIMAL(10, 2),
  })
  brokerOptionFee: number;
  @Column({
    defaultValue: 0.0,
    type: DataTypes.DECIMAL(10, 2),
  })
  brokerStockFee: number;
  @Column({
    allowNull: false,
  })
  userId: string;
}
