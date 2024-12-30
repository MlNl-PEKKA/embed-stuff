import { z } from "zod";

import { feedbackPageRowSchema } from "@embed-stuff/utils/dbValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageRowSchema
  .pick({ id: true })
  .merge(z.object({ next_id: feedbackPageRowSchema.shape.next_id.unwrap() }));

const mutation = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) =>
  await ctx.db
    .from("feedback_page")
    .update({ next_id: input.next_id })
    .eq("id", input.id)
    .eq("user_id", ctx.user.id)
    .throwOnError();

export const connect = authProcedure.input(schema).mutation(mutation);
