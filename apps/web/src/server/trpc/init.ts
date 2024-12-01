import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { ZodError } from "zod";
import type { createTRPCContext } from ".";

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
