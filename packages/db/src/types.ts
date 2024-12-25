import type { Custom } from "@acme/utils/types";

import type { Database, Tables } from "./schema";

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

export type DBEnums<T extends keyof DB["public"]["Enums"]> =
  DB["public"]["Enums"][T];
