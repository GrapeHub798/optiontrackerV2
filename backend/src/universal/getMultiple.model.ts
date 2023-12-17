import { IsNotEmpty } from 'class-validator';

export class DeleteMultiple {
  @IsNotEmpty()
  itemIds: string[];
}
