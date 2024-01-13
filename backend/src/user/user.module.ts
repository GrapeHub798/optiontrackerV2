import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserProfile } from '../userprofile/userprofile.model';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User, UserProfile])],
  providers: [UserService],
})
export class UserModule {}
