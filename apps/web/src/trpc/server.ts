import type { AppRouter } from "@embed-stuff/api";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { createCaller, createTRPCContext } from "@embed-stuff/api";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");
  const cookieStore = await cookies();
  return createTRPCContext({
    headers: heads,
    cookies: cookieStore,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
