import {
  defaultShouldDehydrateQuery,
  MutationCache,
  type Query,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import {
  type TRPCError,
  type TRPCErrorShape,
} from "@trpc/server/unstable-core-do-not-import";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import superjson from "superjson";
import { logout } from "@/app/utils/logout";

export const createQueryClient = (router?: AppRouterInstance) => {
  let queryClient: QueryClient;
  // eslint-disable-next-line prefer-const
  queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) =>
        onError(
          error as unknown as TRPCErrorShape<TRPCError>,
          queryClient,
          router,
        ),
    }),
    mutationCache: new MutationCache({
      onError: (error) =>
        onError(
          error as unknown as TRPCErrorShape<TRPCError>,
          queryClient,
          router,
        ),
      onSuccess: () => {
        const nonStaticQueries = (query: Query) => {
          const defaultStaleTime =
            queryClient.getQueryDefaults(query.queryKey).staleTime ?? 0;
          const staleTimes = query.observers
            .map((observer) => observer.options.staleTime)
            .filter((staleTime) => staleTime !== undefined) as number[];
          const staleTime =
            query.getObserversCount() > 0
              ? Math.min(...staleTimes)
              : defaultStaleTime;
          return staleTime !== Infinity;
        };
        void queryClient.invalidateQueries({
          predicate: nonStaticQueries,
        });
      },
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 5 * 1_000,
        retry: 2,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) => {
          query.state.dataUpdatedAt = Date.now();
          return (
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending"
          );
        },
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
  return queryClient;
};

/**
 *  @see https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
 */
const onError = async (
  error: TRPCErrorShape<TRPCError>,
  queryClient?: QueryClient,
  router?: AppRouterInstance,
) => {
  if (!router || !queryClient) return;
  if ((error?.data?.code ?? null) === "UNAUTHORIZED")
    await logout(queryClient, router);
};
