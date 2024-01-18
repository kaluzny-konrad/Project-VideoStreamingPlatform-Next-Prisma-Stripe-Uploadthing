import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  // ToDo: Additional checks can be added if necessary
  // For example, you might want to check if the user has specific roles or permissions
  // before allowing access to upload routes.
}

export const config = {
  matcher: ["/upload/:path*"],
};
