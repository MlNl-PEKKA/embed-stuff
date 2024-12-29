import { feedbackPageInsertSchema } from "@embed-stuff/utils/feedbackValidators";

import type { FeedbackPageProcedureEndpoint } from "#procedures/feedbackPageProcedure";
import { feedbackPageProcedure } from "#procedures/feedbackPageProcedure";

const schema = feedbackPageInsertSchema.omit({ user_id: true });

const query = async ({
  ctx,
  input,
}: FeedbackPageProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .insert({ ...input, user_id: ctx.user.id })
    .throwOnError();

export const create = feedbackPageProcedure.input(schema).query(query);
