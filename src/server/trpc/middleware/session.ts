import { createProtectedClient } from "@/db/client";
import { t } from "@/server/trpc/init";
import type { Middleware } from "..";

export const session = t.middleware(async ({ next, ctx }) => {
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
