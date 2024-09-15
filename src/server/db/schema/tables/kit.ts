import type { TableType } from ".";
import type { Visibility } from "./common";

export type Kit = TableType<
  "kit",
  {
    visibility: Visibility;
  }
>;
