import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedClient } from "@/db/client";
import { publicProcedure } from "@/server/trpc";
import type { ProcedureDefinition, PublicProcedure } from "@/server/trpc";

const schema = z.object({
  provider: z.enum(["google", "github"]),
});

const mutation = async ({
  ctx: { headers, cookies },
  input: { provider },
}: PublicProcedure<typeof schema>) => {
  const db = createProtectedClient({ cookies });
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

export type Login = ProcedureDefinition<typeof login>;
