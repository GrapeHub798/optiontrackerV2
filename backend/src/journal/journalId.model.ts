import { IsNotEmpty } from 'class-validator';

export class JournalId {
  @IsNotEmpty()
  journalId: string;
}
