import { feedbackProjectRowSchema } from "@embed-stuff/utils/dbValidators";

import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { authProcedure } from "./authProcedure";

const schema = feedbackProjectRowSchema.pick({ id: true });

export const feedbackProcedure = authProcedure.input(schema);

export type FeedbackProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof feedbackProcedure,
  T
>;
export type FeedbackProcedureMiddleware = ProcedureMiddleware<
  typeof feedbackProcedure
>;
