import {
  type ProcedureDefinition,
  type ProtectedProcedure,
  protectedProcedure,
} from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { schema } from "@/forms/create/schema/create";

const mutation = async ({ ctx, input }: ProtectedProcedure<typeof schema>) => {
  const form = (
    await ctx.db
      .from("form")
      .insert({ ...input, user_id: ctx.user.id })
      .select()
      .single()
      .throwOnError()
  ).data;
  if (!form)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong while creating the form",
    });
  return form;
};

export const create = protectedProcedure.input(schema).mutation(mutation);

export type Create = ProcedureDefinition<typeof create>;
