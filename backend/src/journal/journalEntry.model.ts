import { IsNotEmpty } from 'class-validator';

export class JournalEntry {
  @IsNotEmpty()
  entry: string;
  @IsNotEmpty()
  tradeId: string;
}
