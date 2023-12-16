import { UnauthorizedException } from '@nestjs/common';

export class UserHelpers {
  static getUserIdFromRequest(req: any) {
    const userId = req?.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid User Id');
    }
    return userId;
  }
}
