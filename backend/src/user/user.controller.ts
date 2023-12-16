import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Public } from '../metadata/metadata.constants';
import { UserService } from './user.service';
import { UserLogin } from './userLogin.model';
import { UserWithJWTModel } from './userWithJWT.model';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
