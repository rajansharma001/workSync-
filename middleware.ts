import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (
    (session && path == "/login") ||
    (session && path == "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login:path*"],
};
