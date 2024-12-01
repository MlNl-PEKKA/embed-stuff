import type { User } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";
import { createProtectedClient } from "@/db/client";
import { session } from "./session";
import type { Middleware } from "..";

export const auth = session.unstable_pipe(async ({ next, ctx }) => {
  const db = createProtectedClient({ cookies: ctx.cookies });

  let authUser: User | null;

  if (process.env.NODE_ENV === "development")
    authUser = ctx.session?.user ?? null;
  else authUser = (await db.auth.getUser()).data?.user ?? null;

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
});

export type Auth = Middleware<typeof auth>;
