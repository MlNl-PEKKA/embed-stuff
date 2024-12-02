import type { DB } from "@/db/types";
import type { TRPCContext } from "@/server/trpc";
import { createServerClient } from "@supabase/ssr";
import { createClient as _createClient } from "@supabase/supabase-js";

type Args = Pick<TRPCContext, "cookies">;

export const createProtectedClient = (opts: Args) => {
  return createServerClient<DB>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return opts.cookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              opts.cookies.set(name, value, {
                ...options,
                httpOnly: true,
                secure: true,
                sameSite: "lax",
              })
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const createPublicClient = () =>
  _createClient<DB>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
