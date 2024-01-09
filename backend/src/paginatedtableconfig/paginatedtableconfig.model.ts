import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../user/user.model';

@Table
export class PaginatedTableConfig extends Model<PaginatedTableConfig> {
  @Column({
    type: DataTypes.TEXT,
  })
  columnsOrder: string;

  @Column({
    type: DataTypes.TEXT,
  })
  columnVisibility: string;

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  configId: string;

  @Column({
    type: DataTypes.TEXT,
  })
  sortColumns: string;

  @Column
  tableName: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: UUID,
    unique: true,
  })
  userId: string;
}
