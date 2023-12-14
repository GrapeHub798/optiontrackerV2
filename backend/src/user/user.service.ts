import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserWithJWTModel } from './userWithJWT.model';
import { UserLogin } from './userLogin.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async create(userData: UserLogin): Promise<UserWithJWTModel> {
    try {
      const user = new User(userData);
      const newUser = await user.save();
      const payload = { userId: user.userId };
      const token = await this.jwtService.signAsync(payload);
      return new UserWithJWTModel(newUser, token);
    } catch (e) {
      throw new BadRequestException(e.message);
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
        throw new NotFoundException('Unable to find user');
      }

      //try to match the password
      if (!foundUser.validatePassword(loginData.password)) {
        throw new NotFoundException('Incorrect username or password');
      }
      const payload = { userId: foundUser.userId };
      const token = await this.jwtService.signAsync(payload);

      return new UserWithJWTModel(foundUser, token);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
