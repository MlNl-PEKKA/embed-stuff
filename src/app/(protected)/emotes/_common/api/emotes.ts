import { TRPCError } from "@trpc/server";
import { type ProtectedProcedure, protectedProcedure } from "~/server/trpc";
import { createProtectedClient } from "~/server/db";

const query = async ({ ctx }: ProtectedProcedure) => {
  const db = createProtectedClient();
  const emotes = (
    await db
      .from("emote")
      .select()
      .or(`visibility.eq.public, user_id.eq.${ctx.user.id}`)
      .throwOnError()
  ).data;
  if (!emotes)
    throw new TRPCError({ code: "NOT_FOUND", message: "Emotes not found" });
  return emotes;
};

export const emotes = protectedProcedure.query(query);
