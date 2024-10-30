import { env } from "@/env";
import type { DB } from "@/db/types";
import { createClient as _createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const createProtectedClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<DB>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, {
              ...(options as ResponseCookie),
              httpOnly: true,
              secure: true,
              sameSite: "lax",
            }),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

export const createPublicClient = () =>
  _createClient<DB>(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
