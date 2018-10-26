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

export type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type InputProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface ControlledProps {
  defaultValue?: string;
  onChange?: React.FormEventHandler;
  value?: string;
  placeholder?: string;
}

export type InputChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;

// // from styled-components typing

// type KeyofBase = keyof any;
// type Diff<T extends KeyofBase, U extends KeyofBase> = ({ [P in T]: P } &
//     { [P in U]: never })[T];
// type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
// export type DiffBetween<T, U> = Pick<T, Diff<keyof T, keyof U>> &
//     Pick<U, Diff<keyof U, keyof T>>;
// export type WithOptionalTheme<P extends { theme?: T }, T> = Omit<P, 'theme'> & {
//     theme?: T;
// };

// type NonOptionalKeys<T> = { [k in keyof T]-?: undefined extends T[k] ? never : k }[keyof T];

// type PickOptional<T> = {
//   [P in keyof T]?: T[P];
// };