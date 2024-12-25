import { createAuthClient } from "@embed-stuff/db/client";

import type { PublicProcedureMiddleware } from "#procedures/publicProcedure";

export const sessionMiddleware = async ({
  next,
  ctx,
}: PublicProcedureMiddleware) => {
  const db = createAuthClient(ctx);
  const session = (await db.auth.getSession()).data.session;
  return await next({
    ctx: {
      ...ctx,
      session,
    },
  });
};
