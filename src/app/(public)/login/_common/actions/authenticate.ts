import type { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createProtectedClient } from "~/server/db";

export const authenticate = async (provider: Provider) => {
  const supabase = createProtectedClient();
  const origin = headers().get("origin")!;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });
  if (error) redirect("/error");
  if (data.url) redirect(data.url);
};
