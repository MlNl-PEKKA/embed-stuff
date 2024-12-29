import {
  feedbackPageRowSchema,
  feedbackPageUpdateSchema,
} from "@embed-stuff/utils/feedbackValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageUpdateSchema
  .omit({
    user_id: true,
    feedback_project_id: true,
    id: true,
  })
  .extend(
    feedbackPageRowSchema.pick({ id: true, feedback_project_id: true }).shape,
  );

const mutation = async ({
  ctx,
  input: { feedback_project_id, id, ...input },
}: AuthProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .update(input)
    .eq("id", id)
    .eq("feedback_project_id", feedback_project_id)
    .eq("user_id", ctx.user.id)
    .throwOnError();

export const update = authProcedure.input(schema).mutation(mutation);
