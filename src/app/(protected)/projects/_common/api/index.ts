import { createTRPCRouter } from "@/server/trpc";
import { read } from "./read";
import { create } from "@/projects/create/api/create";

export const projects = createTRPCRouter({
  read,
  create,
});
