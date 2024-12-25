import { createTRPCRouter } from "#trpc";
import { feedbacks } from "./feedbacks";
import { user } from "./user";

export const protectedAPI = createTRPCRouter({
  user,
  feedbacks,
});
