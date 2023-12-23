import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export class UserHelpers {
  static generateJWTToken = async (
    jwtService: JwtService,
    userId: string,
  ): Promise<string> => {
    const payload = { userId };
    return await jwtService.signAsync(payload);
  };
  static generateRefreshToken = async (
    jwtService: JwtService,
    userId: string,
    userEmail: string,
  ): Promise<string> => {
    const refreshPayload = { userEmail, userId };
    return await jwtService.signAsync(refreshPayload, {
      expiresIn: process.env.REFRESH_EXPIRATION,
      secret: process.env.REFRESH_SECRET,
    });
  };

  static getUserIdFromRequest = (req: any) => {
    const userId = req?.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid User Id');
    }
    return userId;
  };
}
