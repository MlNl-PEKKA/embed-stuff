import { protectedProcedure } from "@/server/trpc";
import type { ProtectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

const query = async ({ ctx }: ProtectedProcedure) => {
  const emotes = (
    await ctx.db
      .from("emote")
      .select()
      .or(`visibility.eq.public, user_id.eq.${ctx.user.id}`)
      .throwOnError()
  ).data;
  if (!emotes)
    throw new TRPCError({ code: "NOT_FOUND", message: "Emotes not found" });
  return emotes;
};

export const read = protectedProcedure.query(query);
