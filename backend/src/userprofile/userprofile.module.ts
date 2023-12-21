import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserProfileController } from './userprofile.controller';
import { UserProfile } from './userprofile.model';
import { UserProfileService } from './userprofile.service';

@Module({
  controllers: [UserProfileController],
  imports: [SequelizeModule.forFeature([UserProfile])],
  providers: [UserProfileService],
})
export class UserprofileModule {}
