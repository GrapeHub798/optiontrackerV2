// Test suite
import { EodhdStock } from '../eodhdapi/eodhdStock.model';
import { EodhdHelpers } from './eodhdHelpers';

describe('EodhdHelpers Class', () => {
  // Test for transformEodhdStockToStock function
  describe('transformEodhdStockToStock function', () => {
    test('Should correctly transform EodhdStock to Stock', () => {
      const sampleEodhdStock: EodhdStock = {
        Code: 'code',
        Country: 'country',
        Currency: 'currency',
        Exchange: 'exchange',
        Isin: 'isin',
        Name: 'name',
        Type: 'type',
      };

      const result = EodhdHelpers.transformEodhdStockToStock([
        sampleEodhdStock,
      ]);

      expect(result).toHaveLength(1);
      expect(result[0].country).toBe(sampleEodhdStock.Country);
      expect(result[0].currency).toBe(sampleEodhdStock.Currency);
      expect(result[0].exchange).toBe(sampleEodhdStock.Exchange);
      expect(result[0].stockName).toBe(sampleEodhdStock.Name);
      expect(result[0].stockType).toBe(sampleEodhdStock.Type);
      expect(result[0].ticker).toBe(sampleEodhdStock.Code);
    });
  });

  // Test for transformKeysToLowercase function
  describe('transformKeysToLowercase function', () => {
    test('Should correctly transform keys to lowercase', () => {
      const sampleData = {
        Key1: 'Value1',
        Key2: 'Value2',
      };

      const result = EodhdHelpers.transformKeysToLowercase([sampleData]);

      expect(result).toHaveLength(1);
      expect(result[0].key1).toBe('Value1');
      expect(result[0].key2).toBe('Value2');
    });
  });
});
