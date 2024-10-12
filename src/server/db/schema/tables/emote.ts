import type { TableType } from ".";

export type Emote = TableType<
  "emote",
  {
    visibility: Visibility;
  }
>;

type Visibility = "private" | "public";
