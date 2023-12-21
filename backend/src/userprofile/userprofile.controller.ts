import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { NewUserProfile } from './newUserProfile.model';
import { UserProfile } from './userprofile.model';
import { UserProfileService } from './userprofile.service';

@Controller('userprofile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Request() req: any, @Body() newUserProfile: NewUserProfile) {
    return this.userProfileService.create(req, newUserProfile);
  }

  @UseGuards(AuthGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  delete(@Request() req: any) {
    return this.userProfileService.delete(req);
  }

  @UseGuards(AuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  edit(@Request() req: any, @Body() newUserProfile: NewUserProfile) {
    return this.userProfileService.edit(req, newUserProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  get(@Request() req: any): Promise<UserProfile> {
    return this.userProfileService.get(req);
  }
}
