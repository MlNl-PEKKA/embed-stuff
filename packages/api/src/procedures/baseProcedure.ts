import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { t } from "#init";

export const baseProcedure = t.procedure;
export type BaseProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof baseProcedure,
  T
>;
export type BaseProcedureMiddleware = ProcedureMiddleware<typeof baseProcedure>;
