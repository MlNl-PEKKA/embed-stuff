import { env } from "~/env";
import type { DB } from "./schema";
import { createServerClient, createBrowserClient } from "@supabase/ssr";
import type { cookies } from "next/headers";

type Cookies = ReturnType<typeof cookies>;

export const createClient = (cookies: Cookies) =>
  createServerClient<DB>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookies.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value }) => cookies.set(name, value));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });

export const createAdminClient = () =>
  createBrowserClient<DB>(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
