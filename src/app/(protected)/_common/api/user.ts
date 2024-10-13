import { TRPCError } from "@trpc/server";
import { type PrivateProcedure, privateProcedure } from "~/server/api/trpc";
import { createPrivateClient } from "~/server/db";

const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPrivateClient();
  const user = (
    await db.from("user").select().eq("id", ctx.user.id).single().throwOnError()
  ).data;
  if (!user)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  return user;
};

export const user = privateProcedure.query(query);
