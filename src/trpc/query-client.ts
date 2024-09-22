/* eslint-disable prefer-const */
import {
  defaultShouldDehydrateQuery,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import type { TRPCError } from "@trpc/server";
import { type TRPCErrorShape } from "@trpc/server/unstable-core-do-not-import";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SuperJSON from "superjson";
import { ERRORS } from "~/server/enums";

export const createQueryClient = (router?: AppRouterInstance) => {
  let queryClient: QueryClient;
  queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) =>
        onError(error as unknown as TRPCErrorShape<TRPCError>, router),
    }),
    mutationCache: new MutationCache({
      onError: (error) =>
        onError(error as unknown as TRPCErrorShape<TRPCError>, router),
      onSuccess: () => queryClient.invalidateQueries(),
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 10 * 1000,
        retry: 2,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
  return queryClient;
};

const onError = (
  error: TRPCErrorShape<TRPCError>,
  router?: AppRouterInstance,
) => {
  if (!router) return;
  if (error.data.code === ERRORS.UNAUTHORIZED.code) router.push("/login");
};
