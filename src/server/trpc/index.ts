/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ProcedureBuilder } from "@trpc/server/unstable-core-do-not-import";
import { type TypeOf, type ZodSchema } from "zod";
import { t } from "./init";
import { timing } from "./middleware/timing";
import { auth } from "./middleware/auth";

export const createTRPCContext = async (opts: { headers: Headers }) => opts;

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(timing);
export type PublicProcedure<T = undefined> = Procedure<
  typeof publicProcedure,
  T
>;

export const protectedProcedure = t.procedure.use(timing).use(auth);
export type ProtectedProcedure<T = undefined> = Procedure<
  typeof protectedProcedure,
  T
>;

export const proProcedure = t.procedure.use(timing).use(auth);
export type ProProcedure<T = undefined> = Procedure<typeof proProcedure, T>;

type Procedure<
  U extends ProcedureBuilder<any, any, any, any, any, any, any, any>,
  T = unknown,
> = T extends ZodSchema
  ? U extends ProcedureBuilder<
      infer TContext,
      any,
      infer TContextOverrides,
      any,
      any,
      any,
      any,
      any
    >
    ? {
        ctx: TContext & TContextOverrides;
        input: TypeOf<T>;
      }
    : never
  : U extends ProcedureBuilder<
        infer TContext,
        any,
        infer TContextOverrides,
        any,
        any,
        any,
        any,
        any
      >
    ? {
        ctx: TContext & TContextOverrides;
        input: undefined;
      }
    : never;
