import { Table, Column, Model, BeforeCreate } from 'sequelize-typescript';
import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model<User> {
  @Column({
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  userId: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: { name: 'User', msg: 'Email address already in use!' },
    validate: {
      isEmail: { msg: 'That is an invalid email address' },
    },
  })
  email: string;

  @Column
  password: string;

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  @BeforeCreate
  static hashPassword(instance: User) {
    const salt = bcrypt.genSaltSync();
    instance.password = bcrypt.hashSync(instance.password, salt);
  }
}
