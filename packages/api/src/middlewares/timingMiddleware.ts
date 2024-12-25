import type { BaseProcedureMiddleware } from "#procedures/baseProcedure";
import { t } from "#init";

export const timingMiddleware = async ({
  next,
  path,
}: BaseProcedureMiddleware) => {
  const start = Date.now();
  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  const result = await next({ ctx: { hello: "world" } });
  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  return result;
};
