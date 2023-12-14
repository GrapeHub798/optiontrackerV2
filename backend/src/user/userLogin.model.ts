import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserLogin {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  password: string;
}
