import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { app as appRouter } from "#routers/index";
import { createCallerFactory, createTRPCContext } from "#trpc";

type AppRouter = typeof appRouter;

const createCaller = createCallerFactory(appRouter);

type RouterInputs = inferRouterInputs<AppRouter>;

type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter, createCaller };
export type { AppRouter, RouterInputs, RouterOutputs };
