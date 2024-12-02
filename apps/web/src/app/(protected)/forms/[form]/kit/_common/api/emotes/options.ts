/* eslint-disable @typescript-eslint/no-unused-vars */
import { formProcedure } from "@/form/utils/formProcedure";
import type { FormProcedure } from "@/form/utils/formProcedure";
import { emoteRowSchema } from "@/server/db/zod";
import type { ProcedureDefinition } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const schema = z.array(emoteRowSchema);

const query = async ({ ctx, input }: FormProcedure) => {
  const options = (
    await ctx.db
      .from("emote_option")
      .select()
      .not("form_id", "cs", `{"${input.id}"}`)
      .or(`visibility.eq.public, user_id.eq.${ctx.user.id}`)
      .throwOnError()
  ).data;
  if (!options)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Emote options not found",
    });
  return options.map(({ form_id: _, ...emote }) => emote) as z.infer<
    typeof schema
  >;
};

export const options = formProcedure.query(query);

export type Options = ProcedureDefinition<typeof options>;
