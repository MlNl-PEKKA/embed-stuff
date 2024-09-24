import type { SelectiveNotNullTables } from "~/lib/types";

export type NotNullableTables = SelectiveNotNullTables<{
  emote: "created_by" | "url";
  kit: "created_by";
  kit_emote: "kit_id";
  project: "name";
  reaction: "user_id";
  user: "last_name";
}>;
