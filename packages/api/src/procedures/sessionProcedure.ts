import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { sessionMiddleware } from "#middlewares/sessionMiddleware";
import { publicProcedure } from "./publicProcedure";

export const sessionProcedure = publicProcedure.use(sessionMiddleware);
export type SessionProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof sessionProcedure,
  T
>;
export type SessionProcedureMiddleware = ProcedureMiddleware<
  typeof sessionProcedure
>;
