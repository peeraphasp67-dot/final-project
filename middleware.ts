import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session-token");

  const protectedRoutes = ["/products", "/products/create", "/products/category", "/products/", "/products/"]; // include category & id

  const needLogin = protectedRoutes.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  );

  if (!session && needLogin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",
    "/products",
    "/products/create",
    "/products/[id]",
    "/products/[id]/edit",
    "/products/category/:category*"
  ],
};
