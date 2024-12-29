import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const mutation = async ({ ctx }: AuthProcedureEndpoint) =>
  await ctx.db.auth.signOut({ scope: "local" });

export const logout = authProcedure.mutation(mutation);
