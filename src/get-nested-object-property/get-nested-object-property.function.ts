import isString from 'is-string';
import isObject from 'is-object';
import hasOwnProperty from 'ts-has-own-property';

import { TPath, TFieldPathValue, TUnpackNestedValue } from './get-nested-object-property.types';

export const getNestedObjectProperty = <TObject extends object, TProperty extends TPath<TObject>>(
  object: TObject,
  propertyName: TProperty
): TUnpackNestedValue<TFieldPathValue<TObject, TProperty>> | null => {
  if (!isObject(object) || !isString(propertyName) || propertyName.trim() === '') {
    return null;
  }

  const propertyNames = propertyName.split('.');
  let currentObject: any = object;

  for (const _propertyName of propertyNames) {
    if (!isObject(currentObject) || !hasOwnProperty(currentObject, _propertyName)) {
      return null;
    }

    currentObject = currentObject[_propertyName];
  }

  return currentObject ?? null;
};
