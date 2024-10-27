import { app } from "~/app/api";
import { createCallerFactory } from "~/server/trpc";

export const appRouter = app;

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
