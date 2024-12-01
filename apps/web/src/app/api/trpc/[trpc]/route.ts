import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { cookies, headers } from "next/headers";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/trpc/root";
import { createTRPCContext } from "@/server/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async () => {
  const heads = await headers();
  const cookieStore = await cookies();
  return createTRPCContext({
    headers: heads,
    cookies: cookieStore,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
