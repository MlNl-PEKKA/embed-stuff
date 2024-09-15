import type { Custom, CustomizableTypes } from "~/lib/types";
import type { Database } from "../db";
import type { Emote } from "./emote";
import type { Kit } from "./kit";
import type { User } from "./user";
import { Project } from "./project";

type DatabaseTables = Database["public"]["Tables"];
type DatabaseTableInsert<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Insert"];
type DatabaseTableRow<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Row"];
type DatabaseTableUpdate<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Update"];
type DatabaseTableRelationships<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Relationships"];

export type TableType<
  T extends keyof DatabaseTables,
  U extends DatabaseTableRow<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseTableRow<T>[number]>]: any }
    : { [id in keyof Partial<DatabaseTableRow<T>>]: any },
> = Required<
  Custom<
    DatabaseTables[T],
    //@ts-expect-error
    {
      Row: Custom<DatabaseTableRow<T>, U>;
      Insert: Custom<DatabaseTableInsert<T>, U>;
      Update: Custom<DatabaseTableUpdate<T>, U>;
      Relationships: DatabaseTableRelationships<T>;
    }
  >
>;

export type Tables = Custom<
  DatabaseTables,
  {
    emote: Emote;
    kit: Kit;
    project: Project;
    user: User;
  }
>;
