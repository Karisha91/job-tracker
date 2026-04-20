import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token")?.value;
  const protectedRoutes = ["/dashboard", "/applications"]
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/applications", "/applications/:path*"],
};