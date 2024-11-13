import { createProtectedClient } from "@/db/client";
import { protectedProcedure } from "@/server/trpc";

const mutation = async () => {
  const db = await createProtectedClient();
  return await db.auth.signOut({ scope: "local" });
};

export const logout = protectedProcedure.mutation(mutation);
