import { User } from './user.model';

export class UserWithJWTModel {
  email: string;
  jwt: string;
  userId: string;

  constructor(user?: User, jwtToken?: string) {
    this.userId = user?.userId || null;
    this.email = user?.email || null;
    this.jwt = jwtToken || null;
  }
}
