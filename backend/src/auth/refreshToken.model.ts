import { IsNotEmpty } from 'class-validator';

export class RefreshToken {
  @IsNotEmpty()
  refreshToken: string;
}
