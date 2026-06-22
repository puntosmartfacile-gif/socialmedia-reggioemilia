import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/app/lib/supabase/middleware";
import type { ProfileRow } from "@/app/types/database";

const authenticatedRoutes = ["/dashboard", "/prenotazioni", "/profilo", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiresAuth = authenticatedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const { supabase, response, user } = await updateSession(request);

  if (!requiresAuth) {
    return response;
  }

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle<Pick<ProfileRow, "role">>();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/prenotazioni/:path*", "/profilo/:path*", "/admin/:path*"],
};