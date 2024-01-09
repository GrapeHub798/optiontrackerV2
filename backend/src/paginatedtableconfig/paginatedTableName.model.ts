import { IsNotEmpty } from 'class-validator';

export class PaginatedTableName {
  @IsNotEmpty()
  tableName: string;
}
