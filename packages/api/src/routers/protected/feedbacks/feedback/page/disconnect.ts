import { z } from "zod";

import { feedbackPageRowSchema } from "@embed-stuff/utils/dbValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = z.object({
  ids: z.array(feedbackPageRowSchema.shape.id),
});
const mutation = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .update({ next_id: null })
    .in("id", input.ids)
    .throwOnError();

export const disconnect = authProcedure.input(schema).mutation(mutation);
