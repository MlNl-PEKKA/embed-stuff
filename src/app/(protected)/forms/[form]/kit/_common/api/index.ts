import { createTRPCRouter } from "@/server/trpc";
import { emotes } from "./emotes";

export const kit = createTRPCRouter({
  emotes,
});
