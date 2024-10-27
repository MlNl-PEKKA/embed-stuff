import { createProtectedClient } from "~/server/db";
import { protectedProcedure } from "~/server/trpc";

const query = async () => {
  const db = createProtectedClient();
  return await db.auth.signOut();
};

export const logout = protectedProcedure.query(query);
