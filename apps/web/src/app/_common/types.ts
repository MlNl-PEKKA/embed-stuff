/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ReactNode } from "react";
import type { NonUndefined } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@embed-stuff/api";
import type { Prettify } from "@embed-stuff/utils/types";

export type Login = {
  input: RouterInputs["auth"]["login"];
  output: RouterOutputs["auth"]["login"];
};

type InputParams = undefined | string | readonly string[];

type Params<T extends InputParams> = T extends readonly string[]
  ? T extends [...infer Head, "all"]
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      Prettify<{ all: string[] } & Record<[...Head][number], string>>
    : Record<T[number], string>
  : T extends string
    ? Record<T, readonly string[]>
    : never;

type OutputParams<T extends InputParams> = Promise<Params<T>>;

type InputParallelRoutes = undefined | readonly string[];

type OutpurParallelRoutes<T extends InputParallelRoutes> =
  T extends readonly string[] ? Record<T[number], ReactNode> : never;

type RootLayoutProps = {
  children: ReactNode;
};

type RootPageProps<T extends object | undefined = undefined> = {
  searchParams: T extends undefined ? undefined : Promise<object>;
};

type RootCommonProps<T extends InputParams = undefined> = {
  params: OutputParams<T>;
};

export type NextProps<
  T extends InputParams = undefined,
  U extends InputParallelRoutes = undefined,
> = {
  page: PageProps<T>;
  layout: LayoutProps<T, U>;
  params: Params<T>;
};

type PageProps<T extends InputParams = undefined> = T extends undefined
  ? RootPageProps
  : Prettify<RootPageProps & RootCommonProps<T>>;

type LayoutProps<
  T extends InputParams = undefined,
  U extends InputParallelRoutes = undefined,
> = T extends undefined
  ? U extends undefined
    ? RootLayoutProps
    : Prettify<RootLayoutProps & OutpurParallelRoutes<U>>
  : U extends undefined
    ? Prettify<RootLayoutProps & RootCommonProps<T>>
    : Prettify<RootLayoutProps & OutpurParallelRoutes<U> & RootCommonProps<T>>;

export type ParamProps<T extends readonly string[]> = Record<T[number], string>;

export type StoreType<
  T extends Record<string, unknown> | undefined,
  U extends object = {},
  V extends object = {},
> =
  NonUndefined<T> extends infer R
    ? Prettify<
        Required<{
          [key in keyof R]: R[key];
        }> &
          V &
          Required<{
            actions: Prettify<
              Required<{
                [key in keyof R as key extends string
                  ? `set${Capitalize<key>}`
                  : never]: (_value: NonUndefined<R[key]>) => void;
              }> &
                U & { reset: () => void }
            >;
          }>
      >
    : never;
