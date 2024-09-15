import { z } from "zod";

import {
  createTRPCRouter,
  type PublicProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const schema = z.object({ text: z.string() });

const query = ({ input }: PublicProcedure<typeof schema>) => {
  return {
    greeting: `Hello ${input.text}`,
  };
};

export const post = createTRPCRouter({
  hello: publicProcedure.input(schema).query(query),
});
