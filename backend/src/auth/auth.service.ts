import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserHelpers } from '../helpers/userHelpers';
import { UserService } from '../user/user.service';
import { RefreshToken } from './refreshToken.model';
import { UpdatedRefreshToken } from './updatedRefreshToken.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getNewRefreshToken(token: RefreshToken): Promise<UpdatedRefreshToken> {
    //get the refresh token
    const refreshToken = token.refreshToken;
    //verify the refresh token
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_SECRET,
    });
    //validate the userid and email exists
    const userId = payload?.userId;
    const userEmail = payload?.userEmail;
    if (!userId || !userEmail) {
      throw new UnauthorizedException();
    }

    //make sure the user exists
    const foundUser = await this.userService.getAuthUser({
      userEmail,
      userId,
    });

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    //create new jwt token
    const newJWT = await UserHelpers.generateJWTToken(this.jwtService, userId);
    //create new refreshToken
    const newRefreshToken = await UserHelpers.generateRefreshToken(
      this.jwtService,
      userId,
      userEmail,
    );

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);
    return {
      jwt: newJWT,
      refreshToken: newRefreshToken,
      tokenExpiration: expirationDate,
    };
  }
}
