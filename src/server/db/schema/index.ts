import type { Custom } from "~/lib/types";
import type { Database } from "./db";
import type { Tables } from "./tables";

export type DB = Custom<
  Database,
  {
    public: Custom<Database["public"], { Tables: Tables }>;
  }
>;
