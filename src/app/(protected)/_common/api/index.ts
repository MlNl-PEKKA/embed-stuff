import { createTRPCRouter } from "~/server/trpc";
import { user } from "./user";
import { emotes } from "~/emotes/api";

export const protectedAPI = createTRPCRouter({
  user,
  emotes,
});
