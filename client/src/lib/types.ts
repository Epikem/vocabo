// type manipulation utils : https://blog.mariusschulz.com/2017/01/20/typescript-2-1-mapped-types

/**
 * Make all properties in T nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
* Turn all properties of T into strings
*/
export type Stringify<T> = {
  [P in keyof T]: string;
};