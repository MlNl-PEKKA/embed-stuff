// ------------------------------------------------
// 🧩🧩🧩 a library creating a reusable plugin 🧩🧩🧩
// @filename: myPlugin.ts

import { initTRPC, TRPCError } from "@trpc/server";

export type LoggerPluginContext = {
  // the procedure using the plugin will need to extend this context
  logger: {
    log: (...args: any[]) => void;
  };
};

export function createMyPlugin() {
  // When creating a plugin for tRPC, you use the same API as creating any other tRPC-app
  // this is the plugin's root `t`-object
  const t = initTRPC
    .context<LoggerPluginContext>()
    .meta<{
      // the base `initTRPC`-object of the application using this needs to extend this meta
    }>()
    .create();

  return {
    // you can also add `.input()` if you want your plugin to do input validation
    logger: t.procedure.use(async (opts) => {
      const start = Date.now();

      // if (t._config.isDev) {
      //   // artificial delay in dev
      //   const waitMs = Math.floor(Math.random() * 400) + 3000;
      //   await new Promise((resolve) => setTimeout(resolve, waitMs));
      // }

      const result = await opts.next({
        ctx: {
          injectedByPlugin: true,
        },
      });

      const end = Date.now();
      opts.ctx.logger.log(
        `[TRPC] ${opts.path} took ${end - start}ms to execute`,
      );

      return result;
    }),
  };
}
