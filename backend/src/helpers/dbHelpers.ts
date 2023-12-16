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
}
