import { formProcedure } from "@/form/utils/formProcedure";
import type { FormProcedure } from "@/form/utils/formProcedure";
import { formEmoteRowSchema } from "@/server/db/zod";
import type { ProcedureDefinition } from "@/server/trpc";
import { z } from "zod";

const schema = z.object({
  emotes: z.array(formEmoteRowSchema.shape.emote_id),
});

const mutation = async ({ ctx, input }: FormProcedure<typeof schema>) => {
  await ctx.db
    .from("form_emote")
    .delete()
    .eq("form_id", input.id)
    .in("emote_id", input.emotes)
    .throwOnError();
};

export const remove = formProcedure.input(schema).mutation(mutation);

export type Remove = ProcedureDefinition<typeof remove>;
