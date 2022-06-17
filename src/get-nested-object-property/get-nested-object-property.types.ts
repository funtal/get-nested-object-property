// Special thanks to the react-hook-form community for those types !!!!
type FieldValues = Record<string, any>

type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;

type FieldPath<TFieldValues extends FieldValues> = TPath<TFieldValues>;

type TPathValue<T, P extends TPath<T> | TArrayPath<T>> = T extends any
? P extends `${infer K}.${infer R}`
? K extends keyof T
  ? R extends TPath<T[K]>
    ? TPathValue<T[K], R>
    : never
  : K extends `${number}`
  ? T extends ReadonlyArray<infer V>
    ? TPathValue<V, R & TPath<V>>
    : never
  : never
: P extends keyof T
? T[P]
: P extends `${number}`
? T extends ReadonlyArray<infer V>
  ? V
  : never
: never
: never;

type TArrayPathImpl<K extends string | number, V> = V extends Primitive ? never : V extends ReadonlyArray<infer U> ? U extends Primitive ? never : `${K}` | `${K}.${TArrayPath<V>}` : `${K}.${TArrayPath<V>}`;

type TArrayPath<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
  [K in TupleKeys<T>]-?: TArrayPathImpl<K & string, T[K]>;
}[TupleKeys<T>] : TArrayPathImpl<number, V> : {
  [K in keyof T]-?: TArrayPathImpl<K & string, T[K]>;
}[keyof T];

type TPathImpl<K extends string | number, V> = V extends Primitive ? `${K}` : `${K}` | `${K}.${TPath<V>}`;

declare const $NestedValue: unique symbol;

type TNestedValue<TValue extends object = object> = {
[$NestedValue]: never;
} & TValue;

export type TPath<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
  [K in TupleKeys<T>]-?: TPathImpl<K & string, T[K]>;
}[TupleKeys<T>] : TPathImpl<number, V> : {
  [K in keyof T]-?: TPathImpl<K & string, T[K]>;
}[keyof T];

export type TFieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = TPathValue<TFieldValues, TFieldPath>;

export type TUnpackNestedValue<T> = T extends TNestedValue<infer U> ? U : T extends Date | FileList | File | Blob ? T : T extends object ? {
  [K in keyof T]: TUnpackNestedValue<T[K]>;
} : T;
