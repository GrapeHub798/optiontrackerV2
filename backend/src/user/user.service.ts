import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { AuthUser } from '../auth/authUser.model';
import { UserHelpers } from '../helpers/userHelpers';
import { User } from './user.model';
import { UserLogin } from './userLogin.model';
import { UserWithJWTModel } from './userWithJWT.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async generateUserWithJWT(user: User): Promise<UserWithJWTModel> {
    const token = await UserHelpers.generateJWTToken(
      this.jwtService,
      user.userId,
    );
    const refreshToken = await UserHelpers.generateRefreshToken(
      this.jwtService,
      user.userId,
      user.email,
    );

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);
    return new UserWithJWTModel(user, token, refreshToken, expirationDate);
  }
  async getAuthUser(authUser: AuthUser): Promise<boolean> {
    try {
      const foundUser = await this.userModel.findOne({
        where: {
          email: authUser.userEmail,
          userId: authUser.userId,
        },
      });
      return Boolean(foundUser);
    } catch (e) {
      return false;
    }
  }

  async login(loginData: UserLogin): Promise<UserWithJWTModel> {
    try {
      const foundUser = await this.userModel.findOne({
        where: {
          email: loginData.email,
        },
      });
      if (!foundUser) {
        return Promise.reject(new NotFoundException('Unable to find user'));
      }

      //try to match the password
      if (!foundUser.validatePassword(loginData.password)) {
        return Promise.reject(
          new NotFoundException('Incorrect username or password'),
        );
      }

      return this.generateUserWithJWT(foundUser);
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async register(userData: UserLogin): Promise<UserWithJWTModel> {
    try {
      const newUser = await this.userModel.create(userData);
      return this.generateUserWithJWT(newUser);
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
