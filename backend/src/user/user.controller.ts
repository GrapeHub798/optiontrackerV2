import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { Public } from '../metadata/metadata.constants';
import { ChangePassword } from './changePassword.model';
import { UserService } from './user.service';
import { UserLogin } from './userLogin.model';
import { UserWithJWTModel } from './userWithJWT.model';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/change-password')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  changePassword(
    @Request() req: any,
    @Body() changePassword: ChangePassword,
  ): Promise<boolean> {
    return this.userService.changePassword(req, changePassword);
  }

  @Post('/register')
  @Public()
  @HttpCode(HttpStatus.OK)
  create(@Body() userData: UserLogin): Promise<UserWithJWTModel> {
    return this.userService.register(userData);
  }

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginData: UserLogin): Promise<UserWithJWTModel> {
    return this.userService.login(loginData);
  }
}
