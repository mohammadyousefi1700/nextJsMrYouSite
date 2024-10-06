import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const user = request.cookies.get("whoAmI");
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (user && request.nextUrl.pathname.startsWith("/signUp")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/login", "/signUp"],
};
