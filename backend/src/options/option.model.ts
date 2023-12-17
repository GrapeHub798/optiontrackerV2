import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Option extends Model<Option> {
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

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  userId: string;
}
