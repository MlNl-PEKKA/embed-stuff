import { updateSchema } from "@embed-stuff/utils/feedbackValidators";

import type { FeedbackProcedureEndpoint } from "#procedures/feedbackProcedure";
import { feedbackProcedure } from "#procedures/feedbackProcedure";

const mutation = async ({
  ctx,
  input: { id, ...input },
}: FeedbackProcedureEndpoint<typeof updateSchema>) => {
  await ctx.db
    .from("feedback_project")
    .update(input)
    .eq("id", id)
    .eq("user_id", ctx.user.id)
    .throwOnError();
};

export const update = feedbackProcedure.input(updateSchema).mutation(mutation);
