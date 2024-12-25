import { createTRPCRouter } from "#trpc";
import { read } from "./read";

export const feedback = createTRPCRouter({
  read,
});
