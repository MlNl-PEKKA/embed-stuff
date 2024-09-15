import type { TableType } from ".";
import type { Visibility } from "./common";

export type Emote = TableType<
  "emote",
  {
    type: Type;
    visibility: Visibility;
  }
>;

type Type = "emoji" | "sticker";
