import { createTRPCRouter } from "#trpc";
import { feedback } from "./feedback";

export const widget = createTRPCRouter({
  feedback,
});
