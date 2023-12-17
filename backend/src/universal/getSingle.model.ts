import { IsNotEmpty } from 'class-validator';

export class GetOneItem {
  @IsNotEmpty()
  itemId: string;
}
