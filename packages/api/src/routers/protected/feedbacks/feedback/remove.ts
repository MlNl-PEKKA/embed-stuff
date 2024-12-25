import type { FeedbackProcedureEndpoint } from "#procedures/feedbackProcedure";
import { feedbackProcedure } from "#procedures/feedbackProcedure";

const mutation = async ({ ctx, input }: FeedbackProcedureEndpoint) => {
  await ctx.db
    .from("feedback_project")
    .delete()
    .eq("id", input.id)
    .eq("user_id", ctx.user.id)
    .throwOnError();
};

export const remove = feedbackProcedure.mutation(mutation);
