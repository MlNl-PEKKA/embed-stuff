import { z } from "zod";

import { feedbackPageRowSchema } from "@embed-stuff/utils/dbValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageRowSchema.pick({ feedback_project_id: true }).merge(
  z.object({
    ids: z.array(feedbackPageRowSchema.shape.id),
  }),
);
const mutation = async ({
  ctx,
  input,
}: AuthProcedureEndpoint<typeof schema>) => {
  const payload = input.ids.map((id) => ({
    id,
    next_id: null,
    user_id: ctx.user.id,
    feedback_project_id: input.feedback_project_id,
  }));
  await ctx.db.from("feedback_page").upsert(payload).throwOnError();
};

export const disconnect = authProcedure.input(schema).mutation(mutation);
