import { TRPCError } from "@trpc/server";

import { createSchema } from "@embed-stuff/utils/feedbackValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const mutation = async ({
  ctx,
  input,
}: AuthProcedureEndpoint<typeof createSchema>) => {
  const { data } = await ctx.db
    .from("feedback_project")
    .insert({
      user_id: ctx.user.id,
      title: input.title,
    })
    .select("id")
    .single()
    .throwOnError();
  if (!data)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Feedback project not found",
    });
  return data;
};

export const create = authProcedure.input(createSchema).mutation(mutation);
