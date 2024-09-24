import type { Custom } from "~/lib/types";
import type { Database } from "./db";
import type { Tables } from "./tables";
import type { NotNullableTables } from "./nullChecks";

export type DB = Custom<
  Database,
  {
    public: Custom<Database["public"], { Tables: Tables }>;
  }
>;

export type NullChecksDB = Custom<
  DB,
  {
    public: Custom<
      DB["public"],
      {
        Tables: NotNullableTables;
      }
    >;
  }
>;
