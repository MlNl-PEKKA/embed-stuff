/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { DB } from "~/server/db/schema";

export type CustomizableTypes<T extends "Array" | "Object"> = T extends "Array"
  ? Record<string, unknown>[]
  : Record<string, unknown>;

export type Custom<
  T extends CustomizableTypes<"Array"> | CustomizableTypes<"Object">,
  U extends T extends CustomizableTypes<"Array">
    ? Partial<{ [id in keyof T[number]]: unknown }>
    : Partial<{ [id in keyof T]: unknown }>,
> =
  T extends CustomizableTypes<"Array">
    ? (Omit<T[number], keyof U> &
        Required<Pick<U, Extract<keyof RequiredOnly<T[number]>, keyof U>>> &
        Partial<Pick<U, Extract<keyof PartialOnly<T[number]>, keyof U>>>)[]
    : T extends CustomizableTypes<"Object">
      ? Omit<T, keyof U> &
          Required<Pick<U, Extract<keyof RequiredOnly<T>, keyof U>>> &
          Partial<Pick<U, Extract<keyof PartialOnly<T>, keyof U>>>
      : never;

export type RequiredOnly<T extends CustomizableTypes<"Object">> = Pick<
  T,
  {
    [id in keyof T]-?: undefined extends T[id] ? never : id;
  }[keyof T]
>;

export type PartialOnly<T extends CustomizableTypes<"Object">> = Omit<
  T,
  keyof RequiredOnly<T>
>;

type ExcludeNullable<T> = T extends null ? never : T;

type IgnoreNullable<T extends Record<string, unknown>> = {
  [id in keyof T]: ExcludeNullable<T[id]>;
};

type NeverNullable<T extends Record<string, unknown>> = {
  [id in keyof T]: null extends T[id] ? never : T[id];
};

type NeverNotNullable<T extends Record<string, unknown>> = {
  [id in keyof T]: null extends T[id] ? T[id] : never;
};

type OmitNever<T extends Record<string, unknown>> = {
  [id in keyof T as T[id] extends never ? never : id]: T[id];
};

type PickNullable<T extends Record<string, unknown>> = OmitNever<
  NeverNotNullable<T>
>;

type OmitNullable<T extends Record<string, unknown>> = OmitNever<
  NeverNullable<T>
>;

export type SelectiveNotNull<
  T extends Record<string, unknown>,
  U extends keyof PickNullable<T>,
> = OmitNullable<T> &
  Pick<IgnoreNullable<PickNullable<T>>, U> &
  Omit<PickNullable<T>, U>;

export type SelectiveNotNullTables<
  T extends OmitNever<{
    [id in keyof DB["public"]["Tables"]]: keyof PickNullable<
      DB["public"]["Tables"][id]["Row"]
    >;
  }>,
> = Custom<
  DB["public"]["Tables"],
  {
    [id in keyof T]: Custom<
      //@ts-expect-error
      DB["public"]["Tables"][id],
      {
        Row: SelectiveNotNull<
          //@ts-expect-error
          DB["public"]["Tables"][id]["Row"],
          T[id]
        >;
      }
    >;
  }
>;
