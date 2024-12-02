import { formProcedure } from "@/form/utils/formProcedure";
import type { FormProcedure } from "@/form/utils/formProcedure";
import type { ProcedureDefinition } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

const query = async ({ ctx, input }: FormProcedure) => {
  const form = (
    await ctx.db
      .from("form")
      .select("form_emote!left(emote!inner(*))")
      .eq("id", input.id)
      .eq("user_id", ctx.user.id)
      .single()
      .throwOnError()
  ).data;
  if (!form)
    throw new TRPCError({ code: "NOT_FOUND", message: "Emotes not found" });
  const { form_emote } = form;
  return form_emote.map(({ emote }) => emote);
};

export const read = formProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
