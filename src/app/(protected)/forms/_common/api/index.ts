import { createTRPCRouter } from "@/server/trpc";
import { read } from "./read";
import { create } from "@/forms/create/api/create";

export const forms = createTRPCRouter({
  read,
  create,
});
