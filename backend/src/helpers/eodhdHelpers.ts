import { EodhdStock } from '../eodhdapi/eodhdStock.model';
import { Stock } from '../stocks/stock.model';

export class EodhdHelpers {
  static transformEodhdStockToStock(eodhdStockArray: EodhdStock[]): Stock[] {
    return eodhdStockArray.map((eodhdStock) => {
      return <Stock>{
        country: eodhdStock.Country,
        currency: eodhdStock.Currency,
        exchange: eodhdStock.Exchange,
        stockName: eodhdStock.Name,
        stockType: eodhdStock.Type,
        ticker: eodhdStock.Code,
      };
    });
  }

  static transformKeysToLowercase(data: any[]): any[] {
    return data.map((item) => {
      const transformed = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          transformed[key.toLowerCase()] = item[key];
        }
      }
      return transformed;
    });
  }
}
