import { createTRPCRouter } from "#trpc";
import { read } from "./read";

export const page = createTRPCRouter({
  read,
});
