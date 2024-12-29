import { feedbackPageUpdateSchema } from "@embed-stuff/utils/feedbackValidators";

import type { FeedbackPageProcedureEndpoint } from "#procedures/feedbackPageProcedure";
import { feedbackPageProcedure } from "#procedures/feedbackPageProcedure";

const schema = feedbackPageUpdateSchema.omit({ user_id: true });

const query = async ({
  ctx,
  input,
}: FeedbackPageProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .update(input)
    .eq("feedback_project_id", input.feedback_project_id)
    .eq("user_id", ctx.user.id)
    .throwOnError();

export const update = feedbackPageProcedure.input(schema).query(query);
