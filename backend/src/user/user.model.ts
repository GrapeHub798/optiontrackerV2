import * as bcrypt from 'bcrypt';
import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { BeforeSave, Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    type: DataTypes.STRING,
    unique: { msg: 'Email address already in use!', name: 'User' },
    validate: {
      isEmail: { msg: 'That is an invalid email address' },
    },
  })
  email: string;

  @Column
  password: string;

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: UUID,
  })
  userId: string;

  @BeforeSave
  static hashNewPassword(instance: User) {
    const salt = bcrypt.genSaltSync();
    instance.password = bcrypt.hashSync(instance.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
