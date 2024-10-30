import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getBaseUrl } from "~/lib/getBaseUrl";
import { createProtectedClient } from "~/server/db";
import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from "~/server/trpc";

const schema = z.object({
  provider: z.enum(["google", "github"]),
});

const mutation = async ({
  input: { provider },
}: PublicProcedure<typeof schema>) => {
  const db = createProtectedClient();
  const origin = getBaseUrl();
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

export type Login = ProcedureDefinition<typeof login>;
