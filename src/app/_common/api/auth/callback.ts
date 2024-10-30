import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedClient } from "@/db/client";
import { type PublicProcedure, publicProcedure } from "@/server/trpc";

const schema = z.object({
  origin: z.string(),
  code: z.string().nullable(),
  next: z.string().nullable(),
});

const query = async ({
  ctx: { headers },
  input: { code, next, origin },
}: PublicProcedure<typeof schema>) => {
  if (!code)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Missing auth code",
    });
  const db = createProtectedClient();
  const { error } = await db.auth.exchangeCodeForSession(code);
  if (error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error exchanging auth code",
    });
  const forwardedHost = headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) return `${origin}${next}`;
  else if (forwardedHost) return `https://${forwardedHost}${next}`;
  else return `${origin}${next}`;
};

export const callback = publicProcedure.input(schema).query(query);
