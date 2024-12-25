import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { timingMiddleware } from "#middlewares/timingMiddleware";
import { baseProcedure } from "./baseProcedure";

export const publicProcedure = baseProcedure.use(timingMiddleware);
export type PublicProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof publicProcedure,
  T
>;
export type PublicProcedureMiddleware = ProcedureMiddleware<
  typeof publicProcedure
>;
