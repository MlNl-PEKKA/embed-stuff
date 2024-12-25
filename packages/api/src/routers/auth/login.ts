import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createAuthClient } from "@embed-stuff/db/client";

import type { PublicProcedureEndpoint } from "#procedures/publicProcedure";
import { publicProcedure } from "#procedures/publicProcedure";

const schema = z.object({
  provider: z.enum(["google", "github"]),
});

const mutation = async ({
  ctx: { headers, cookies },
  input: { provider },
}: PublicProcedureEndpoint<typeof schema>) => {
  const db = createAuthClient({ cookies, headers });
  const origin = headers.get("origin");
  const { data, error } = await db.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });
  if (error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error trying to sign in",
    });
  return data;
};

export const login = publicProcedure.input(schema).mutation(mutation);
