import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Exchange extends Model<Exchange> {
  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  code: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  country: string;

  @Column
  countryISO2: string;

  @Column
  countryISO3: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  currency: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  name: string;
  @Column
  operatingMic: string;
}
