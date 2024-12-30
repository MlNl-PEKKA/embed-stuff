import { TRPCError } from "@trpc/server";

import { feedbackPageRowSchema } from "@embed-stuff/utils/dbValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageRowSchema.pick({ feedback_project_id: true });

const query = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) => {
  const data = (
    await ctx.db
      .from("feedback_page")
      .select("id, created_at, feedback_project_id, meta, is_root")
      .eq("feedback_project_id", input.feedback_project_id)
      .eq("user_id", ctx.user.id)
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Feedback page nodes not found",
    });
  return data;
};

export const nodes = authProcedure.input(schema).query(query);
