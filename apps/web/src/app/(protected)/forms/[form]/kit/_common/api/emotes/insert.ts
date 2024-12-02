import { formProcedure } from "@/form/utils/formProcedure";
import type { FormProcedure } from "@/form/utils/formProcedure";
import { formEmoteRowSchema } from "@/server/db/zod";
import type { ProcedureDefinition } from "@/server/trpc";
import { z } from "zod";

const schema = z.object({
  emotes: z.array(formEmoteRowSchema.shape.emote_id),
});

const mutation = async ({ ctx, input }: FormProcedure<typeof schema>) => {
  const payload = input.emotes.map((emote_id) => ({
    emote_id,
    form_id: input.id,
  }));
  await ctx.db.from("form_emote").insert(payload).throwOnError();
};

export const insert = formProcedure.input(schema).mutation(mutation);

export type Insert = ProcedureDefinition<typeof insert>;
