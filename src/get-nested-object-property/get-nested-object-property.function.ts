import isString from 'is-string';
import isObject from 'is-object';
import hasOwnProperty from 'ts-has-own-property';

import { FieldPathValue, Path, UnpackNestedValue } from './get-nested-object-property.types';

export const getNestedObjectProperty = <TObject extends object, TProperty extends Path<TObject>>(
  object: TObject,
  propertyName: TProperty
): UnpackNestedValue<FieldPathValue<TObject, TProperty>> | null => {
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
