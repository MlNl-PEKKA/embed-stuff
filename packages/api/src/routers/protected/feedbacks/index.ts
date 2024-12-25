import { createTRPCRouter } from "#trpc";
import { create } from "./create";
import { feedback } from "./feedback";
import { read } from "./read";

export const feedbacks = createTRPCRouter({
  read,
  create,
  feedback,
});
