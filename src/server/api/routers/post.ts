import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  type PrivateProcedure,
} from "~/server/api/trpc";

const schema = z.object({ text: z.string() });

const query = ({ input }: PrivateProcedure<typeof schema>) => {
  return {
    greeting: `Hello ${input.text}`,
  };
};

export const post = createTRPCRouter({
  hello: privateProcedure.input(schema).query(query),
});
