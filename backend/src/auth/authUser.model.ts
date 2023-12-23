import { IsNotEmpty } from 'class-validator';

export class AuthUser {
  @IsNotEmpty()
  userEmail: string;
  @IsNotEmpty()
  userId: string;
}
