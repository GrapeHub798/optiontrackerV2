import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserWithJWTModel } from './userWithJWT.model';
import { UserLogin } from './userLogin.model';
import { Public } from '../metadata/metadata.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @Public()
  @HttpCode(HttpStatus.OK)
  create(@Body() userData: UserLogin): Promise<UserWithJWTModel> {
    return this.userService.create(userData);
  }

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginData: UserLogin): Promise<UserWithJWTModel> {
    return this.userService.login(loginData);
  }
}
