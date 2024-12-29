/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  UseTRPCMutationResult,
  UseTRPCQueryResult,
} from "@trpc/react-query/shared";
import type {
  AnyProcedureBuilder,
  GetRawInputFn,
  inferProcedureBuilderResolverOptions,
  MiddlewareResult,
  Overwrite,
  ProcedureBuilder,
  ProcedureType,
  Simplify,
} from "@trpc/server/unstable-core-do-not-import";
import type { TypeOf, ZodSchema } from "zod";

import type { Prettify } from "@embed-stuff/utils/types";

type Definition = { _def: { $types: any } };

export type ProcedureDefinition<T extends Definition> = Pick<
  T["_def"]["$types"],
  "input" | "output"
>;

export type ProcedureQuery<T extends ProcedureDefinition<Definition>> =
  UseTRPCQueryResult<T["output"], any>;

export type ProcedureMutation<T extends ProcedureDefinition<Definition>> =
  UseTRPCMutationResult<T["output"], any, any, any>;

export type ProcedureEndpoint<T extends AnyProcedureBuilder, U = undefined> =
  inferProcedureBuilderResolverOptions<T> extends infer R
    ? U extends ZodSchema
      ? Prettify<R & { input: TypeOf<U> }>
      : R
    : never;

export type ProcedureMiddleware<T> =
  T extends ProcedureBuilder<
    infer TContext,
    infer TMeta,
    infer TContextOverrides,
    infer _TInputIn,
    infer TInputOut,
    infer _TOutputIn,
    infer _TOutputOut,
    infer _TCaller extends boolean
  >
    ? {
        ctx: Simplify<Overwrite<TContext, TContextOverrides>>;
        type: ProcedureType;
        path: string;
        input: TInputOut;
        getRawInput: GetRawInputFn;
        meta: TMeta | undefined;
        signal: AbortSignal | undefined;
        next: {
          (): Promise<MiddlewareResult<TContextOverrides>>;
          <$ContextOverride>(opts: {
            ctx?: $ContextOverride;
            input?: unknown;
          }): Promise<MiddlewareResult<$ContextOverride>>;
          (opts: {
            getRawInput: GetRawInputFn;
          }): Promise<MiddlewareResult<TContextOverrides>>;
        };
      }
    : never;
