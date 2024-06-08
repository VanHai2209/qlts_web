import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/",
    "/plan/:path*",
    "/category-management/:path*",
    "/asset-management/:path*",
    "/analysis-report/:path*",
  ],
};

export default withAuth(function middleware(request: NextRequest) {
  request.headers.set("x-url", request.url);

  return NextResponse.next({ request });
});
