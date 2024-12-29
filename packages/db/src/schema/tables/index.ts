/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Custom, CustomizableTypes } from "@embed-stuff/utils/types";

import type { Database } from "../default";
import type { FeedbackPage } from "./feedback_page";

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
    ? { [id in keyof Partial<DatabaseTableRow<T>[number]>]: unknown }
    : { [id in keyof Partial<DatabaseTableRow<T>>]: unknown },
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

export type TableGuard<
  T extends { Row: unknown; Insert: unknown; Update: unknown },
  _U extends T["Row"],
  _V extends T["Insert"],
  _W extends T["Update"],
> = T;

export type Tables = Custom<
  DatabaseTables,
  {
    feedback_page: FeedbackPage;
  }
>;
