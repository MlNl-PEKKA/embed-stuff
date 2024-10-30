import type { User } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";
import { env } from "@/env";
import { createProtectedClient } from "@/db/client";
import { session } from "./session";

export const auth = session.unstable_pipe(async ({ next, ctx }) => {
  const db = createProtectedClient();

  let authUser: User | null;
  if (env.NODE_ENV === "development") authUser = ctx.session?.user ?? null;
  else authUser = (await db.auth.getUser()).data?.user ?? null;
  if (!authUser)
    throw new TRPCError({ code: "FORBIDDEN", message: "User unauthenticated" });

  const user = (
    await db.from("user").select().eq("id", authUser.id).single().throwOnError()
  ).data;
  if (!user)
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

  return await next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
