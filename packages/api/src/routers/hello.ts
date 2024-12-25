import { publicProcedure } from "#procedures/publicProcedure";

export const helloRouter = publicProcedure.query(({ ctx }) => {
  return `${ctx.hello}, world!`;
});
