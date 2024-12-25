import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { authMiddleware } from "#middlewares/authMiddleware";
import { publicProcedure } from "./publicProcedure";

export const authProcedure = publicProcedure.use(authMiddleware);
export type AuthProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof authProcedure,
  T
>;
export type AuthProcedureMiddleware = ProcedureMiddleware<typeof authProcedure>;
