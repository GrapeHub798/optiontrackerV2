import { DataTypes, NOW, UUID, UUIDV4 } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';

import { Trade } from '../trade/trade.model';

@Table
export class Journal extends Model<Journal> {
  @Column({
    allowNull: false,
    defaultValue: NOW,
    type: DataTypes.DATE,
  })
  date: Date;

  @Column({
    type: DataTypes.TEXT,
  })
  journalEntry: string;

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  journalId: string;

  @HasOne(() => Trade)
  trade: Trade;

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  userId: string;
}
