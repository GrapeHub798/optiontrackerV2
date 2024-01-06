import { User } from './user.model';

export class UserWithJWTModel {
  email: string;
  hasUserProfile: boolean;
  jwt: string;
  refreshToken: string;
  tokenExpiration: Date;
  userId: string;

  constructor(
    user?: User,
    jwtToken?: string,
    refreshToken?: string,
    tokenExpiration?: Date,
    hasUserProfile?: boolean,
  ) {
    this.userId = user?.userId || null;
    this.email = user?.email || null;
    this.jwt = jwtToken || null;
    this.refreshToken = refreshToken || null;
    this.tokenExpiration = tokenExpiration || null;
    this.hasUserProfile = hasUserProfile || false;
  }
}
