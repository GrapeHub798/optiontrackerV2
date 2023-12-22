import { describe, expect, it } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';

import { DbHelpers } from './dbHelpers';

describe('DbHelpers', () => {
  describe('chunkArray', () => {
    it('should correctly chunk an array', () => {
      expect(DbHelpers.chunkArray([1, 2, 3, 4, 5], 2)).toEqual([
        [1, 2],
        [3, 4],
        [5],
      ]);
    });

    it('should throw TypeError if first argument is not an array', () => {
      expect(() => DbHelpers.chunkArray('not an array', 2)).toThrow(TypeError);
    });

    it('should throw TypeError if size is not a positive number', () => {
      expect(() => DbHelpers.chunkArray([1, 2, 3], -1)).toThrow(TypeError);
    });
  });

  describe('getPrimaryKeyColumn', () => {
    it('should return the primary key if it exists', () => {
      const mockGetAttributes = jest.fn().mockReturnValue({
        id: { primaryKey: true },
        name: { primaryKey: false },
      });

      const mockModel: any = { getAttributes: mockGetAttributes };
      expect(DbHelpers.getPrimaryKeyColumn(mockModel)).toEqual('id');
    });

    it('should return null if no primary key exists', () => {
      const mockGetAttributes = jest.fn().mockReturnValue({
        id: { primaryKey: false },
        name: { primaryKey: false },
      });

      const mockModel: any = { getAttributes: mockGetAttributes };
      expect(DbHelpers.getPrimaryKeyColumn(mockModel)).toBeNull();
    });
  });

  describe('findRecordByPrimaryKeyAndUserId', () => {
    it('should return a record if found', async () => {
      const mockFindOne = jest
        .fn()
        .mockResolvedValue({ id: '1', userId: 'user1' });
      const mockGetAttributes = jest.fn().mockReturnValue({
        id: { primaryKey: true },
        userId: {},
      });

      const mockModel: any = {
        findOne: mockFindOne,
        getAttributes: mockGetAttributes,
      };

      const result = await DbHelpers.findRecordByPrimaryKeyAndUserId(
        mockModel,
        'user1',
        '1',
      );
      expect(result).toEqual({ id: '1', userId: 'user1' });
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { id: '1', userId: 'user1' },
      });
    });

    it('should throw NotFoundException if record is not found', async () => {
      const mockFindOne = jest.fn().mockResolvedValue(null);
      const mockGetAttributes = jest.fn().mockReturnValue({
        id: { primaryKey: true },
        userId: {},
      });

      const mockModel: any = {
        findOne: mockFindOne,
        getAttributes: mockGetAttributes,
      };

      await expect(
        DbHelpers.findRecordByPrimaryKeyAndUserId(mockModel, 'user1', '2'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
