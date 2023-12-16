import { IsNotEmpty } from 'class-validator';

export class JournalTradeId {
  @IsNotEmpty()
  tradeId: string;
}
