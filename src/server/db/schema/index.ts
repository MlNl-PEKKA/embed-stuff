import type { Custom } from "~/lib/types";
import type { Database } from "./db";
import type { Tables } from "./tables";

export type DB = Custom<
  Database,
  {
    public: Custom<Database["public"], { Tables: Tables }>;
  }
>;

type _Tables = DB["public"]["Tables"];

export type DBTable<
  T extends keyof _Tables,
  U extends keyof _Tables[T] = "Row",
> = _Tables[T][U];
