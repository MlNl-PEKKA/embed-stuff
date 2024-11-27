import { type FormProcedure, formProcedure } from "@/form/utils/formProcedure";
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
  return [];
};

export const emotes = formProcedure.query(query);
