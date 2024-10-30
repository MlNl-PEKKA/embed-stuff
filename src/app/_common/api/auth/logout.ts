import { createProtectedClient } from "@/db/client";
import { protectedProcedure } from "@/server/trpc";

const mutation = async () => {
  const db = createProtectedClient();
  return await db.auth.signOut({ scope: "global" });
};

export const logout = protectedProcedure.mutation(mutation);
