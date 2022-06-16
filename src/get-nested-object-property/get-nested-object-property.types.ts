// Special thanks to the react-hook-form community for these types !!!!
declare type FieldValues = Record<string, any>

declare type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;

declare type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;

export declare type Path<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
  [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]>;
}[TupleKeys<T>] : PathImpl<number, V> : {
  [K in keyof T]-?: PathImpl<K & string, T[K]>;
  }[keyof T];

declare type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

declare type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends any ? P extends `${infer K}.${infer R}` ? K extends keyof T ? R extends Path<T[K]> ? PathValue<T[K], R> : never : K extends `${number}` ? T extends ReadonlyArray<infer V> ? PathValue<V, R & Path<V>> : never : never : P extends keyof T ? T[P] : P extends `${number}` ? T extends ReadonlyArray<infer V> ? V : never : never : never;

export declare type FieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = PathValue<TFieldValues, TFieldPath>;

declare type ArrayPathImpl<K extends string | number, V> = V extends Primitive ? never : V extends ReadonlyArray<infer U> ? U extends Primitive ? never : `${K}` | `${K}.${ArrayPath<V>}` : `${K}.${ArrayPath<V>}`;

declare type ArrayPath<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
    [K in TupleKeys<T>]-?: ArrayPathImpl<K & string, T[K]>;
}[TupleKeys<T>] : ArrayPathImpl<number, V> : {
    [K in keyof T]-?: ArrayPathImpl<K & string, T[K]>;
  }[keyof T];

declare type PathImpl<K extends string | number, V> = V extends Primitive ? `${K}` : `${K}` | `${K}.${Path<V>}`;

declare const $NestedValue: unique symbol;

declare type NestedValue<TValue extends object = object> = {
    [$NestedValue]: never;
} & TValue;

export declare type UnpackNestedValue<T> = T extends NestedValue<infer U> ? U : T extends Date | FileList | File | Blob ? T : T extends object ? {
    [K in keyof T]: UnpackNestedValue<T[K]>;
} : T;
