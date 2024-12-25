import type { Custom, CustomizableTypes } from "@acme/utils/types";

import type { Database } from "../default";

type DatabaseTables = Database["public"]["Tables"];
type DatabaseTableInsert<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Insert"];
type DatabaseTableRow<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Row"];
type DatabaseTableUpdate<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Update"];

export type TableType<
  T extends keyof DatabaseTables,
  U extends DatabaseTableRow<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseTableRow<T>[number]>]: any }
    : { [id in keyof Partial<DatabaseTableRow<T>>]: any },
> = Custom<
  DatabaseTables[T],
  //@ts-expect-error
  {
    //@ts-expect-error
    Row: Custom<DatabaseTableRow<T>, U>;
    //@ts-expect-error
    Insert: Custom<DatabaseTableInsert<T>, U>;
    //@ts-expect-error
    Update: Custom<DatabaseTableUpdate<T>, U>;
  }
>;

export type Tables = Custom<DatabaseTables, {}>;
