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
import { createPublicClient } from "@/server/db/client";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { createProtectedClient } from "@/db/client";
import type { User } from "@supabase/supabase-js";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { createMyPlugin, LoggerPluginContext } from "./logger";

export type TRPCContext = {
  headers: Headers;
  cookies: ReadonlyRequestCookies;
};

export const createTRPCContext = async (opts: TRPCContext) => {
  const adminDb = createPublicClient();
  const loggerCtx: LoggerPluginContext = {
    logger: {
      log(...args) {
        console.log(...args);
      },
    },
  };
  return {
    ...opts,
    adminDb,
    ...loggerCtx,
  };
};

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const loggerPlugin = createMyPlugin();
export const publicProcedure = t.procedure.use(async (opts) => {
  const start = Date.now();

  // if (t._config.isDev) {
  //   // artificial delay in dev
  //   const waitMs = Math.floor(Math.random() * 400) + 3000;
  //   await new Promise((resolve) => setTimeout(resolve, waitMs));
  // }

  const result = await opts.next();

  const end = Date.now();
  console.log(`[TRPC] ${opts.path} took ${end - start}ms to execute`);

  return result;
});
//   .unstable_concat(loggerPlugin.logger);

export const authedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  const db = createProtectedClient({ cookies: ctx.cookies });

  let authUser: User | null;

  if (env.NODE_ENV === "development") authUser = ctx.session?.user ?? null;
  else authUser = (await db.auth.getUser()).data?.user ?? null;

  if (!authUser)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User unauthenticated",
    });

  const user = (
    await db.from("user").select().eq("id", authUser.id).single().throwOnError()
  ).data;

  if (!user)
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

  return await opts.next({
    ctx: {
      user,
      db,
    },
  });
});

export const proProcedure = authedProcedure.use(async (opts) => {
  const { ctx } = opts;
  const membership = ctx.user.membership;

  if (membership !== "pro")
    throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });

  return await opts.next({
    ctx: {
      user: {
        ...ctx.user,
        membership,
      },
    },
  });
});
