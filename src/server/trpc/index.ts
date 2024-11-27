/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  UseTRPCMutationResult,
  UseTRPCQueryResult,
} from "@trpc/react-query/shared";
import type { inferProcedureBuilderResolverOptions } from "@trpc/server";
import type {
  AnyProcedureBuilder,
  MiddlewareBuilder,
  MiddlewareFunction,
} from "@trpc/server/unstable-core-do-not-import";
import { type TypeOf, type ZodSchema } from "zod";
import { t } from "./init";
import { auth } from "./middleware/auth";
import { pro } from "./middleware/pro";
import { session } from "./middleware/session";
import { createPublicClient } from "@/server/db/client";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export type TRPCContext = {
  headers: Headers;
  cookies: ReadonlyRequestCookies;
};

export const createTRPCContext = async (opts: TRPCContext) => {
  const adminDb = createPublicClient();
  return {
    ...opts,
    adminDb,
  };
};

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(session);
export type PublicProcedure<T = undefined> = Procedure<
  typeof publicProcedure,
  T
>;

export const protectedProcedure = t.procedure.use(auth);
export type ProtectedProcedure<T = undefined> = Procedure<
  typeof protectedProcedure,
  T
>;

export const proProcedure = t.procedure.use(pro);
export type ProProcedure<T = undefined> = Procedure<typeof proProcedure, T>;

type Definition = { _def: { $types: any } };

export type ProcedureDefinition<T extends Definition> = Pick<
  T["_def"]["$types"],
  "input" | "output"
>;

export type ProcedureQuery<T extends ProcedureDefinition<Definition>> =
  UseTRPCQueryResult<T["output"], any>;

export type ProcedureMutation<T extends ProcedureDefinition<Definition>> =
  UseTRPCMutationResult<T["output"], any, any, any>;

export type Procedure<T extends AnyProcedureBuilder, U = undefined> =
  inferProcedureBuilderResolverOptions<T> extends infer R
    ? U extends ZodSchema
      ? R & { input: TypeOf<U> }
      : R
    : never;

export type Middleware<
  T,
  ContextOverridesOut = undefined,
> = inferMiddlewareBuilderOptions<T, ContextOverridesOut>;

type inferMiddlewareBuilderOptions<T, $ContextOverridesOut = undefined> =
  T extends MiddlewareBuilder<
    infer TContext,
    infer TMeta,
    infer TContextOverrides,
    infer TInputOut
  >
    ? Parameters<
        MiddlewareFunction<
          TContext,
          TMeta,
          TContextOverrides,
          $ContextOverridesOut,
          TInputOut
        >
      >[0]
    : never;
