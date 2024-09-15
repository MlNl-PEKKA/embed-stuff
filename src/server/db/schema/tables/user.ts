import type { TableType } from ".";

export type User = TableType<
  "user",
  {
    membership: Membership;
  }
>;

type Membership = "free" | "pro";
