import { TRPCError } from "@trpc/server";
import { schema } from "@/form/schema/update";
import { formProcedure, type FormProcedure } from "@/form/utils/formProcedure";
import { ProcedureDefinition } from "@/server/trpc";

const mutation = async ({ ctx, input }: FormProcedure<typeof schema>) => {
  const form = (
    await ctx.db
      .from("form")
      .update({ ...input })
      .eq("user_id", ctx.user.id)
      .eq("id", ctx.form)
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

export const update = formProcedure.input(schema).mutation(mutation);

export type Update = ProcedureDefinition<typeof update>;
