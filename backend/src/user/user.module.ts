import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserprofileModule } from '../userprofile/userprofile.module';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User]), UserprofileModule],
  providers: [UserService],
})
export class UserModule {}
