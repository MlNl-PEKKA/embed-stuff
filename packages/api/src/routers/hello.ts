import { publicProcedure } from "../trpc";

export const helloRouter = publicProcedure.query(() => {
  return "Hello, world!";
});
