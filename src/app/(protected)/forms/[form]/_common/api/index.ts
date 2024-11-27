import { createTRPCRouter } from "@/server/trpc";
import { read } from "./read";
import { update } from "./update";

export const form = createTRPCRouter({
  read,
  update,
});
