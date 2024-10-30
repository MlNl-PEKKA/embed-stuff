import { createProtectedClient } from "~/server/db";
import { protectedProcedure } from "~/server/trpc";

const mutation = async () => {
  const db = createProtectedClient();
  return await db.auth.signOut({ scope: "local" });
};

export const logout = protectedProcedure.mutation(mutation);
