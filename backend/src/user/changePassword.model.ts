import { IsNotEmpty } from 'class-validator';

export class ChangePassword {
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  oldPassword: string;
}
