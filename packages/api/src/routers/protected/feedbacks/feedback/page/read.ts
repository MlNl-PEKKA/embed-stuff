import { TRPCError } from "@trpc/server";

import type { FeedbackProcedureEndpoint } from "#procedures/feedbackProcedure";
import { feedbackProcedure } from "#procedures/feedbackProcedure";

const query = async ({ ctx, input }: FeedbackProcedureEndpoint) => {
  const data = (
    await ctx.db
      .from("feedback_project")
      .select()
      .eq("id", input.id)
      .single()
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Feedback project not found",
    });
  return data;
};

export const read = feedbackProcedure.query(query);
