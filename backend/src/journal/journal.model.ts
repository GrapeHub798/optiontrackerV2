import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes, NOW, UUID, UUIDV4 } from 'sequelize';

@Table
export class Journal extends Model<Journal> {
  @Column({
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  journalId: string;

  @Column({
    type: UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: UUID,
  })
  tradeId: string;

  @Column({
    type: DataTypes.TEXT,
  })
  journalEntry: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW,
  })
  date: Date;
}
