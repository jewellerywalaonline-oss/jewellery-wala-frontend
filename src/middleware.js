import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("user");
  const token = tokenCookie?.value;

  // Redirect /category to /category/all
  if (pathname === "/category") {
    return NextResponse.redirect(
      new URL("/category/shop-by-category", request.url)
    );
  }



  // If user is not logged in and tries to access a protected route
  if ( !token &&
    pathname.startsWith("/profile") ||
    (pathname.startsWith("/verify-email"))
  ) {
    // Store the intended URL to redirect back after login
    const loginUrl = new URL("/login", request.url);
    // loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to access auth routes
  if (
    (pathname.startsWith("/login") || pathname.startsWith("/signup")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)"],
};
