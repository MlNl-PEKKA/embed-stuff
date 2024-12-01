import { createProtectedClient } from "@/db/client";
import type { Middleware } from "..";
import { timing } from "./timing";

export const session = timing.unstable_pipe(async ({ next, ctx }) => {
  const db = createProtectedClient({ cookies: ctx.cookies });

  const session = (await db.auth.getSession()).data.session;

  return await next({
    ctx: {
      ...ctx,
      session,
    },
  });
});

export type Session = Middleware<typeof session>;
