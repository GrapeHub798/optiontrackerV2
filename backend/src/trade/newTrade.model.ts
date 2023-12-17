import { IsNotEmpty } from 'class-validator';

export class NewTrade {
  buyDate: Date;
  buyPrice: number;
  optionId: string;
  @IsNotEmpty()
  quantity: number;
  sellDate: Date;
  sellPrice: number;
  stockId: string;
}
