import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { AuthUser } from '../auth/authUser.model';
import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { UserProfile } from '../userprofile/userprofile.model';
import { ChangePassword } from './changePassword.model';
import { User } from './user.model';
import { UserLogin } from './userLogin.model';
import { UserWithJWTModel } from './userWithJWT.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(UserProfile)
    private readonly userProfileModel: typeof UserProfile,
    private jwtService: JwtService,
  ) {}

  async changePassword(
    req: any,
    changePassword: ChangePassword,
  ): Promise<boolean> {
    try {
      const foundUser = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        User,
        UserHelpers.getUserIdFromRequest(req),
      );
      //try to match the password
      if (!foundUser.validatePassword(changePassword.oldPassword)) {
        return Promise.reject(
          new NotFoundException('Incorrect username or password'),
        );
      }

      foundUser.password = changePassword.newPassword;
      await foundUser.save();
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
  async generateUserWithJWT(
    user: User,
    hasProfile: boolean,
  ): Promise<UserWithJWTModel> {
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

    return new UserWithJWTModel(
      user,
      token,
      refreshToken,
      expirationDate,
      hasProfile,
    );
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
      const validPassword = await foundUser.validatePassword(
        loginData.password,
      );
      if (!validPassword) {
        return Promise.reject(
          new NotFoundException('Incorrect username or password'),
        );
      }

      //check if the user profile exists
      const userProfile = await this.userProfileModel.findOne({
        where: {
          userId: foundUser.userId,
        },
      });

      const profileExists = Boolean(
        userProfile?.preferredExchange && userProfile?.preferredLanguage,
      );

      return this.generateUserWithJWT(foundUser, profileExists);
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async register(userData: UserLogin): Promise<UserWithJWTModel> {
    try {
      const newUser = await this.userModel.create(userData);
      return this.generateUserWithJWT(newUser, false);
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
