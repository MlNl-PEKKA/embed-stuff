import { TRPCError } from "@trpc/server";

import { feedbackPageRowSchema } from "@embed-stuff/utils/dbValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageRowSchema.pick({ feedback_project_id: true });

const query = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) => {
  const data = (
    await ctx.db
      .from("feedback_page")
      .select("id, next_id")
      .eq("feedback_project_id", input.feedback_project_id)
      .eq("user_id", ctx.user.id)
      .not("next_id", "is", null)
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Feedback page edges not found",
    });
  return data;
};

export const edges = authProcedure.input(schema).query(query);
