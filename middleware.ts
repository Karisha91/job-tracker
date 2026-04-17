import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token")?.value;
  console.log("Token:", token);
  console.log("Pathname:", request.nextUrl.pathname);
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};