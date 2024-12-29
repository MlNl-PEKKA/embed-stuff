import { feedbackPageRowSchema } from "@embed-stuff/utils/feedbackValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageRowSchema.pick({ id: true });

const mutation = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .delete()
    .eq("id", input.id)
    .eq("user_id", ctx.user.id)
    .throwOnError();

export const remove = authProcedure.input(schema).mutation(mutation);
