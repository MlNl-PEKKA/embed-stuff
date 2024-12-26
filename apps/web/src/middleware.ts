import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createAuthClient } from "@embed-stuff/db/client";
import { SafeObject } from "@embed-stuff/utils/safeObject";

import { PROTECTED_PATHS } from "~/protected/constants/paths";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

const PUBLIC_API = ["trpc", "auth"].map((api) => `^/api/${api}(/.*)?$`);

const PUBLIC_ROUTES = new RegExp(["^/$", ...PUBLIC_API].join("|"));

const PROTECTED_ROUTES = new RegExp(
  SafeObject.keys(PROTECTED_PATHS)
    .map((path) => {
      switch (path) {
        case "/profile":
          return `^${path}$`;
        default:
          return `^${path}(/.*)?$`;
      }
    })
    .join("|"),
);

const PROTECTED_DEFAULT: keyof typeof PROTECTED_PATHS = "/feedbacks";

const SIGN_IN = "/login";

export const middleware = async (request: NextRequest) => {
  const result =
    (await preflightCheck(request)) ??
    (await publicPageCheck(request)) ??
    (await sessionCheck(request));

  return result ?? NextResponse.redirect(new URL("/", request.nextUrl));
};

const getCORSHeaders = (origin?: string | null): HeadersInit => {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, x-trpc-source",
  };

  if (origin?.startsWith("http://localhost")) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
};

const preflightCheck: MiddlewareType = (request) => {
  const isPreflight = request.method === "OPTIONS";

  if (!isPreflight) return;

  const origin = request.headers.get("origin");
  const headers = getCORSHeaders(origin);

  return NextResponse.json({}, { headers });
};

const publicPageCheck: MiddlewareType = (request) => {
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_ROUTES.test(pathname);

  if (!isPublicPath) return;

  const origin = request.headers.get("origin");
  const headers = getCORSHeaders(origin);

  return NextResponse.next({ headers });
};

const sessionCheck: MiddlewareType = async (request) => {
  try {
    const { pathname } = request.nextUrl;
    const headers = request.headers;
    const cookieStore = await cookies();
    const db = createAuthClient({ headers, cookies: cookieStore });
    const session = (await db.auth.getSession()).data.session;
    if (session) {
      if (pathname === SIGN_IN || !PROTECTED_ROUTES.test(pathname))
        return NextResponse.redirect(
          new URL(PROTECTED_DEFAULT, request.nextUrl),
        );
      return NextResponse.next();
    } else if (pathname === SIGN_IN) return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(PROTECTED_DEFAULT, request.nextUrl));
  }
};

type MiddlewareType<
  T extends NextRequest = NextRequest,
  R = NextResponse | undefined,
> = (_req: T) => R | Promise<R>;
