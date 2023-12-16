import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

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

  private async generateUserWithJWT(user: User): Promise<UserWithJWTModel> {
    const payload = { userId: user.userId };
    const token = await this.jwtService.signAsync(payload);
    return new UserWithJWTModel(user, token);
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
      const user = new User(userData);
      const newUser = await user.save();
      return this.generateUserWithJWT(newUser);
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
