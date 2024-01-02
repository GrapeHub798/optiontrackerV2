import { IsNotEmpty } from 'class-validator';

export class NewTrade {
  brokerId: string;
  buyDate: Date;
  buyPrice: number;
  expirationDate?: Date;
  isOption?: boolean;
  optionType?: number;
  @IsNotEmpty()
  quantity: number;
  sellDate: Date;
  sellPrice: number;
  strikePrice?: number;
  ticker: string;
}
