import { IsNotEmpty } from 'class-validator';

export class NewOption {
  @IsNotEmpty()
  expirationDate: Date;
  @IsNotEmpty()
  optionType: number;
  strikePrice: number;
  @IsNotEmpty()
  ticker: string;
}
