import { feedbackPageInsertSchema } from "@embed-stuff/utils/feedbackValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageInsertSchema.omit({ user_id: true });

const mutation = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .insert({ ...input, user_id: ctx.user.id })
    .throwOnError();

export const create = authProcedure.input(schema).mutation(mutation);
