import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/projects";

  const url = await api.auth.callback({ code, next, origin });

  return redirect(url);
};
