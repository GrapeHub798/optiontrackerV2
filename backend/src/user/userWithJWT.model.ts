import { User } from './user.model';

export class UserWithJWTModel {
  userId: string;
  email: string;
  jwt: string;

  constructor(user?: User, jwtToken?: string) {
    this.userId = user?.userId || null;
    this.email = user?.email || null;
    this.jwt = jwtToken || null;
  }
}
