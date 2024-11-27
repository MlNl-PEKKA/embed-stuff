import type { Prettify } from "@/lib/types";
import type { ReactNode } from "react";

type InputParams = undefined | string | readonly string[];

type OutputParams<T extends InputParams> = T extends readonly string[]
  ? Promise<{ [id in T[number]]: string }>
  : T extends string
    ? Promise<{ [id in T]: readonly string[] }>
    : never;

type InputParallelRoutes = undefined | readonly string[];

type OutpurParallelRoutes<T extends InputParallelRoutes> =
  T extends readonly string[]
    ? {
        [id in T[number]]: ReactNode;
      }
    : never;

type RootLayout = {
  children: ReactNode;
};

export type LayoutProps<
  T extends InputParams = undefined,
  U extends InputParallelRoutes = undefined,
> = T extends undefined
  ? U extends undefined
    ? RootLayout
    : Prettify<RootLayout & OutpurParallelRoutes<U>>
  : U extends undefined
    ? Prettify<
        RootLayout & {
          params: OutputParams<T>;
        }
      >
    : Prettify<
        RootLayout &
          OutpurParallelRoutes<U> & {
            params: OutputParams<T>;
          }
      >;

export type ParamsProps<T extends readonly string[]> = {
  [id in T[number]]: string;
};
