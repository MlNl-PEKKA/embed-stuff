import { z } from "zod";

import { feedbackPageRowSchema } from "@embed-stuff/utils/feedbackValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = z.object({
  ids: z.array(feedbackPageRowSchema.shape.id),
});

const mutation = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .delete()
    .in("id", input.ids)
    .neq("is_root", true)
    .eq("user_id", ctx.user.id)
    .throwOnError();

export const remove = authProcedure.input(schema).mutation(mutation);
