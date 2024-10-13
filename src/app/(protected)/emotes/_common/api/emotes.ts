import { TRPCError } from "@trpc/server";
import { type PrivateProcedure, privateProcedure } from "~/server/api/trpc";
import { createPrivateClient } from "~/server/db";

const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPrivateClient();
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

export const emotes = privateProcedure.query(query);
