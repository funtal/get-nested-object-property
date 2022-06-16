import { getNestedObjectProperty } from '../src';

describe('getNestedObjectProperty function', () => {
  it('should return null when passed object is not an object', () => {
    // @ts-expect-error
    expect(getNestedObjectProperty(null, 'key')).toBeNull();
    // @ts-expect-error
    expect(getNestedObjectProperty(new Date(), 'key')).toBeNull();
  });

  it('should return null when passed property is not a string or is an empty string', () => {
    // @ts-expect-error
    expect(getNestedObjectProperty({ key: 1 }, '')).toBeNull();
    // @ts-expect-error
    expect(getNestedObjectProperty({ key: 1 }, null)).toBeNull();
  });

  it('should return null when passed property does not exists in the object', () => {
    // @ts-expect-error
    expect(getNestedObjectProperty({ key1: 1 }, 'key')).toBeNull();
    // @ts-expect-error
    expect(getNestedObjectProperty({ key: { key: 2 } }, 'key.key1')).toBeNull();
    // @ts-expect-error
    expect(getNestedObjectProperty({ key: { key: 2 } }, 'key1.key')).toBeNull();
  });

  it('should return key from the object', () => {
    expect(getNestedObjectProperty({ key: 1 }, 'key')).toStrictEqual(1);
    expect(
      getNestedObjectProperty(
        { key: { nestedOne: 'nested key' } },
        'key.nestedOne'
      )
    ).toStrictEqual('nested key');
  });
});
