import { IsNotEmpty } from 'class-validator';

export class NewUserProfile {
  @IsNotEmpty()
  preferredExchange: string;
  preferredLanguage: string;
}
