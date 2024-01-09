import { IsNotEmpty } from 'class-validator';

export class NewPaginatedTable {
  columnsOrder: string;
  columnsVisibility: string;
  sortColumns: string;
  @IsNotEmpty()
  tableName: string;
}
