import { createTRPCRouter } from "@/server/trpc";
import { read } from "./read";

export const projects = createTRPCRouter({
  read,
});
