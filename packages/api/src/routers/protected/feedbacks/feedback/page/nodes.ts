import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { feedbackPageRowSchema } from "@embed-stuff/utils/dbValidators";

import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const schema = feedbackPageRowSchema
  .pick({ feedback_project_id: true })
  .merge(z.object({ disconnected: z.boolean().default(true) }));

const query = async ({ ctx, input }: AuthProcedureEndpoint<typeof schema>) => {
  const data = (
    await ctx.db
      .from("feedback_page")
      .select("id, created_at, feedback_project_id, meta, is_root, next_id")
      .eq("feedback_project_id", input.feedback_project_id)
      .eq("user_id", ctx.user.id)
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Feedback page nodes not found",
    });

  if (input.disconnected) return data.map(({ next_id: _, ...node }) => node);

  let root = data.find((node) => node.is_root);

  if (!root)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Root page not found",
    });

  const nodes = [] as typeof data;

  while (root) {
    nodes.push(root);
    root = data.find((node) => node.id === root?.next_id);
  }

  return nodes.map(({ next_id: _, ...node }) => node);
};

export const nodes = authProcedure.input(schema).query(query);
