/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseTRPCQueryResult } from "@trpc/react-query/shared";
import type { inferProcedureBuilderResolverOptions } from "@trpc/server";
import type { AnyProcedureBuilder } from "@trpc/server/unstable-core-do-not-import";
import { type TypeOf, type ZodSchema } from "zod";
import { t } from "./init";
import { auth } from "./middleware/auth";
import { pro } from "./middleware/pro";
import { session } from "./middleware/session";
import { timing } from "./middleware/timing";

export const createTRPCContext = async (opts: { headers: Headers }) => opts;

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(timing).use(session);
export type PublicProcedure<T = undefined> = Procedure<
  typeof publicProcedure,
  T
>;

export const protectedProcedure = t.procedure.use(timing).use(auth);
export type ProtectedProcedure<T = undefined> = Procedure<
  typeof protectedProcedure,
  T
>;

export const proProcedure = t.procedure.use(timing).use(pro);
export type ProProcedure<T = undefined> = Procedure<typeof proProcedure, T>;

type Definition = { _def: { $types: any } };

export type ProcedureDefinition<T extends Definition> = Pick<
  T["_def"]["$types"],
  "input" | "output"
>;

export type ProcedureQuery<T extends ProcedureDefinition<Definition>> =
  UseTRPCQueryResult<T["output"], any>;

type Procedure<T extends AnyProcedureBuilder, U = undefined> =
  inferProcedureBuilderResolverOptions<T> extends infer R
    ? U extends ZodSchema
      ? R & { input: TypeOf<U> }
      : R
    : never;
