import { createTRPCRouter } from "@/server/trpc";
import { read } from "./read";
import { update } from "./update";
import { kit } from "@/form/kit/api";

export const form = createTRPCRouter({
  read,
  update,
  kit,
});
