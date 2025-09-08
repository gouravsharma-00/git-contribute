import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// define which emails are allowed to access admin
const allowedAdmins = ["gourav.sharma.glamat2932@gmail.com", "owner@example.com"]

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // If no session, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url))
  }

  // If email is not in the allowed list, block access
  if (!allowedAdmins.includes(token.email as string)) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Otherwise, allow request to continue
  return NextResponse.next()
}

// Apply middleware only on /admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
