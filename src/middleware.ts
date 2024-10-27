import { type NextRequest, NextResponse } from "next/server";

import { createProtectedClient } from "~/server/db";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

const PUBLIC_API = ["trpc", "auth/callback"].map(
  (api) => `^/api/${api}(/.*)?$`,
);

const PUBLIC_ROUTES = new RegExp(["^/$", ...PUBLIC_API].join("|"));

const PROTECTED_ROUTES = new RegExp(
  ["^/emotes(/.*)?$", "^/projects(/.*)?$", "^/profile$"].join("|"),
);

const PROTECTED_DEFAULT = "/projects";

const SIGN_IN = "/login";

export const middleware = async (request: NextRequest) => {
  return (
    (await preflightCheck(request)) ??
    (await publicPageCheck(request)) ??
    (await sessionCheck(request)) ??
    NextResponse.redirect(new URL(SIGN_IN, request.nextUrl))
  );
};

const preflightCheck: MiddlewareType = async (request) => {
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders: HeadersInit = {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    const origin = request.headers.get("origin") ?? "";

    const isAllowedOrigin = origin.startsWith("http://localhost");

    if (isAllowedOrigin)
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

  const session = (await createProtectedClient().auth.getSession()).data
    ?.session;

  if (session) {
    if (pathname === SIGN_IN || !PROTECTED_ROUTES.test(pathname))
      return NextResponse.redirect(new URL(PROTECTED_DEFAULT, request.nextUrl));
    return NextResponse.next();
  } else if (pathname === SIGN_IN) return NextResponse.next();
};

type MiddlewareType<T extends NextRequest = NextRequest> = (
  _req: T,
) => Promise<NextResponse | undefined>;
