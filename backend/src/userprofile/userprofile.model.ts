import { UUID, UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class UserProfile extends Model<UserProfile> {
  @Column({
    allowNull: false,
    defaultValue: 'US',
  })
  preferredExchange: string;
  @Column
  preferredLanguage: string;
  @Column({
    unique: true,
  })
  userId: string;
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  userProfileId: string;
}
