import type { User } from "@supabase/supabase-js";
import { createAuthClient } from "@acme/db/client";
import { TRPCError } from "@trpc/server";

import type { PublicProcedureMiddleware } from "#procedures/publicProcedure";

export const authMiddleware = async ({
  next,
  ctx,
}: PublicProcedureMiddleware) => {
  const db = createAuthClient(ctx);
  const session = (await db.auth.getSession()).data.session;
  let authUser: User | null;

  if (process.env.NODE_ENV === "development") authUser = session?.user ?? null;
  else authUser = (await db.auth.getUser()).data.user ?? null;

  if (!authUser)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User unauthenticated",
    });

  const user = (
    await db.from("user").select().eq("id", authUser.id).single().throwOnError()
  ).data;

  if (!user)
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

  return await next({
    ctx: {
      user,
      db,
    },
  });
};
