import type { AuthProcedureEndpoint } from "#procedures/protectedProcedure";
import { authProcedure } from "#procedures/protectedProcedure";

const mutation = async ({ ctx }: AuthProcedureEndpoint) =>
  await ctx.db.auth.signOut({ scope: "local" });

export const logout = authProcedure.mutation(mutation);
