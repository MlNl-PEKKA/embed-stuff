import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { authMiddleware } from "#middlewares/authMiddleware";
import { sessionProcedure } from "./sessionProcedure";

export const authProcedure = sessionProcedure.use(authMiddleware);
export type AuthProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof authProcedure,
  T
>;
export type AuthProcedureMiddleware = ProcedureMiddleware<typeof authProcedure>;
