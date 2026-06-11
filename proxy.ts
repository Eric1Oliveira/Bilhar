import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/admin", "/perfil", "/meus-pedidos"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    // Supabase stores the session in a cookie named sb-<ref>-auth-token
    const hasSession = request.cookies.getAll().some(
      (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
    );

    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
