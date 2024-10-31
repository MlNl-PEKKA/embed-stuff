import { createTRPCRouter } from "@/server/trpc";
import { user } from "./user";
import { emotes } from "@/emotes/api";
import { projects } from "@/projects/api";

export const protectedAPI = createTRPCRouter({
  user,
  emotes,
  projects,
});
