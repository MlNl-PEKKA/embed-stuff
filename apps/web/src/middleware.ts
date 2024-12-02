import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createProtectedClient } from "@/db/client";
import { cookies } from "next/headers";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

const PUBLIC_API = ["trpc", "auth"].map((api) => `^/api/${api}(/.*)?$`);

const PUBLIC_ROUTES = new RegExp(["^/$", ...PUBLIC_API].join("|"));

const PROTECTED_ROUTES = new RegExp(
  ["^/emotes(/.*)?$", "^/abc(/.*)?$", "^/forms(/.*)?$", "^/profile$"].join("|")
);

const PROTECTED_DEFAULT = "/forms";

const SIGN_IN = "/login";

export const middleware = async (request: NextRequest) => {
  return (
    (await preflightCheck(request)) ??
    (await publicPageCheck(request)) ??
    (await sessionCheck(request)) ??
    NextResponse.redirect(new URL("/", request.nextUrl))
  );
};

const preflightCheck: MiddlewareType = async (request) => {
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders: HeadersInit = {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    const origin = request.headers.get("origin");

    const isAllowedOrigin = (origin ?? "").startsWith("http://localhost");

    if (isAllowedOrigin && origin)
      preflightHeaders["Access-Control-Allow-Origin"] = origin;

    return NextResponse.json({}, { headers: preflightHeaders });
  }
};

const publicPageCheck: MiddlewareType = async (request) => {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.test(pathname)) return NextResponse.next();
};

const sessionCheck: MiddlewareType = async (request) => {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const db = createProtectedClient({ cookies: cookieStore });

  const session = (await db.auth.getSession()).data?.session;

  if (session) {
    if (pathname === SIGN_IN || !PROTECTED_ROUTES.test(pathname))
      return NextResponse.redirect(new URL(PROTECTED_DEFAULT, request.nextUrl));
    return NextResponse.next();
  } else if (pathname === SIGN_IN) return NextResponse.next();
};

type MiddlewareType<T extends NextRequest = NextRequest> = (
  _req: T
) => Promise<NextResponse | undefined>;
