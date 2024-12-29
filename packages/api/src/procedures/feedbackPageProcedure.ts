import { feedbackPageRowSchema } from "@embed-stuff/utils/feedbackValidators";

import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { authProcedure } from "./protectedProcedure";

const schema = feedbackPageRowSchema.pick({
  id: true,
  feedback_project_id: true,
});

export const feedbackPageProcedure = authProcedure.input(schema);

export type FeedbackPageProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof feedbackPageProcedure,
  T
>;
export type FeedbackPageProcedureMiddleware = ProcedureMiddleware<
  typeof feedbackPageProcedure
>;
