import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Public } from '../metadata/metadata.constants';
import { AuthService } from './auth.service';
import { RefreshToken } from './refreshToken.model';
import { UpdatedRefreshToken } from './updatedRefreshToken.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  getNewRefreshToken(
    @Body() token: RefreshToken,
  ): Promise<UpdatedRefreshToken> {
    return this.authService.getNewRefreshToken(token);
  }
}
