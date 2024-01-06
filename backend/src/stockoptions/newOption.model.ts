import { IsNotEmpty } from 'class-validator';

export class NewStockOption {
  @IsNotEmpty()
  expirationDate: Date;
  @IsNotEmpty()
  optionType: number;
  strikePrice: number;
  @IsNotEmpty()
  ticker: string;
}
