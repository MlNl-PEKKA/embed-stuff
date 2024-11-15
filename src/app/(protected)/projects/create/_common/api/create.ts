import {
  type ProcedureDefinition,
  type ProtectedProcedure,
  protectedProcedure,
} from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { schema } from "@/projects/create/schema/create";

const mutation = async ({ ctx, input }: ProtectedProcedure<typeof schema>) => {
  const project = (
    await ctx.db
      .from("project")
      .insert({ ...input, user_id: ctx.user.id })
      .select()
      .single()
      .throwOnError()
  ).data;
  if (!project)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong while creating the project",
    });
  return project;
};

export const create = protectedProcedure.input(schema).mutation(mutation);

export type Create = ProcedureDefinition<typeof create>;
