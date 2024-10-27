import { createProtectedClient } from "~/server/db";
import { t } from "~/server/trpc/init";

export const session = t.middleware(async ({ next, ctx }) => {
  const db = createProtectedClient();

  const session = (await db.auth.getSession()).data.session;

  return await next({
    ctx: {
      ...ctx,
      session,
    },
  });
});
