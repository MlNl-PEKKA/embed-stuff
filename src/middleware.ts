import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "~/server/db";

// 1. Specify protected and public routes
const publicRoutes = ["/login", "/"] as const;

export async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(
    path as (typeof publicRoutes)[number],
  );
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) NextResponse.redirect(new URL("/error", req.nextUrl));
  if (isPublicRoute) {
    if (data.session) return NextResponse.redirect(new URL("/", req.nextUrl));
    return NextResponse.next();
  } else {
    if (data.session) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*.svg$|sitemap.xml|robots.txt).*)",
  ],
};
