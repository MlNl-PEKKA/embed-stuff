import type { TableType } from ".";

export type Project = TableType<
  "project",
  {
    status: Status;
  }
>;

type Status = "inactive" | "active";
