import { NotFoundException } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';

export class DbHelpers {
  static chunkArray = (arr, size) => {
    if (!Array.isArray(arr)) {
      throw new TypeError('First argument must be an array');
    }
    if (typeof size !== 'number' || size < 1) {
      throw new TypeError('Second argument must be a positive number');
    }
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size),
    );
  };

  static findRecordByPrimaryKeyAndUserId = async <T extends Model>(
    model: ModelCtor<T>,
    userId: string,
    value?: string,
  ): Promise<null | T> => {
    const primaryKey: string = DbHelpers.getPrimaryKeyColumn(model);
    if (!primaryKey) {
      throw new Error('Primary key not found for the given model.');
    }

    const where: WhereOptions = {};
    if (value) {
      where[primaryKey] = value;
    }
    where['userId'] = userId;

    const foundModel = await model.findOne({ where });
    if (!foundModel) {
      throw new NotFoundException(`${Model.name} not found`);
    }
    return foundModel;
  };

  static getPrimaryKeyColumn = <T extends Model>(
    model: ModelCtor<T>,
  ): null | string => {
    const attributes = model.getAttributes();

    for (const [key, attribute] of Object.entries(attributes)) {
      if (attribute.primaryKey) {
        return key;
      }
    }

    return null;
  };
}
