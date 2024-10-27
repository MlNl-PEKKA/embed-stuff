import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/projects";

  const redirect = await api.auth.callback({ code, next, origin });

  return NextResponse.redirect(redirect);
};
