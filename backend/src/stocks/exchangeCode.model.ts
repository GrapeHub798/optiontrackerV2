import { IsNotEmpty } from 'class-validator';

export class ExchangeCode {
  @IsNotEmpty()
  exchangeCode: string;
}
