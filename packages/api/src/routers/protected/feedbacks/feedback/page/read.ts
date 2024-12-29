import { TRPCError } from "@trpc/server";

import type { FeedbackProcedureEndpoint } from "#procedures/feedbackProcedure";
import { feedbackProcedure } from "#procedures/feedbackProcedure";

const query = async ({ ctx, input }: FeedbackProcedureEndpoint) => {
  const data = (
    await ctx.db
      .from("feedback_page")
      .select()
      .eq("feedback_project_id", input.id)
      .eq("user_id", ctx.user.id)
      .order("order", { nullsFirst: false, ascending: true })
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Feedback pages not found",
    });
  return data;
};

export const read = feedbackProcedure.query(query);
