import { TRPCError } from "@trpc/server";

import { readSchema } from "@embed-stuff/utils/feedbackValidators";

import type { AuthProcedureEndpoint } from "#procedures/protectedProcedure";
import { authProcedure } from "#procedures/protectedProcedure";

const query = async ({
  ctx,
  input,
}: AuthProcedureEndpoint<typeof readSchema>) => {
  const query = ctx.db
    .from("feedback_project")
    .select("id, created_at, title, status")
    .eq("user_id", ctx.user.id);

  if (typeof input?.title !== "undefined")
    query.ilike("title", `%${input.title}%`);

  if (typeof input?.status !== "undefined" && input.status.length !== 0)
    query.in("status", input.status);

  const feedbacks = (await query.throwOnError()).data;

  if (!feedbacks)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "feedback_project not found",
    });

  return feedbacks;
};

export const read = authProcedure.input(readSchema).query(query);
