import { redirect } from "next/navigation";
import { connection } from "next/server";

import { api } from "~/trpc/server";

export const GET = async (request: Request) => {
  await connection();
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/feedbacks";

  const url = await api.auth.callback({ code, next, origin });

  return redirect(url);
};
