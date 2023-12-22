import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DbHelpers } from '../helpers/dbHelpers';
import { UserHelpers } from '../helpers/userHelpers';
import { NewUserProfile } from './newUserProfile.model';
import { UserProfile } from './userprofile.model';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile)
    private readonly userProfileModel: typeof UserProfile,
  ) {}

  async create(req: any, newUserProfile: NewUserProfile) {
    try {
      await this.userProfileModel.create({
        ...newUserProfile,
        userId: UserHelpers.getUserIdFromRequest(req),
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async delete(req: any) {
    try {
      await this.userProfileModel.destroy({
        where: {
          userId: UserHelpers.getUserIdFromRequest(req),
        },
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async edit(req: any, newUserProfile: NewUserProfile) {
    try {
      const profile = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        UserProfile,
        UserHelpers.getUserIdFromRequest(req),
      );
      await profile.update(newUserProfile);
      return true;
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }

  async get(req: any): Promise<UserProfile> {
    try {
      return await DbHelpers.findRecordByPrimaryKeyAndUserId(
        UserProfile,
        UserHelpers.getUserIdFromRequest(req),
      );
    } catch (e) {
      return Promise.reject(new InternalServerErrorException(e.message));
    }
  }
}
