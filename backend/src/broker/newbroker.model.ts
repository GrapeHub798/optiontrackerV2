import { IsNotEmpty } from 'class-validator';

export class NewBroker {
  @IsNotEmpty()
  brokerName: string;
  brokerOptionFee?: number;
  brokerStockFee?: number;
}
