import { describe, expect, it } from '@jest/globals';

import { DbHelpers } from './dbHelpers';

describe('DbHelpers class', () => {
  describe('chunkArray method', () => {
    it('should throw a TypeError if the first argument is not an array', () => {
      expect(() => DbHelpers.chunkArray(null, 1)).toThrow(TypeError);
      expect(() => DbHelpers.chunkArray('string', 1)).toThrow(TypeError);
    });

    it('should throw a TypeError if the second argument is not a positive number', () => {
      expect(() => DbHelpers.chunkArray([], -1)).toThrow(TypeError);
      expect(() => DbHelpers.chunkArray([], 0)).toThrow(TypeError);
      expect(() => DbHelpers.chunkArray([], 'string')).toThrow(TypeError);
    });

    it('should return a chunked array when presented with valid inputs', () => {
      const array = [1, 2, 3, 4, 5];
      const size = 2;
      const expected = [[1, 2], [3, 4], [5]];
      expect(DbHelpers.chunkArray(array, size)).toEqual(expected);
    });
  });
});
