import { helloRouter } from "./routers/hello";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
