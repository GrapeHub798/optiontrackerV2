import { DataTypes, NOW, UUID, UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: UUID,
  })
  tradeId: string;

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  userId: string;
}
