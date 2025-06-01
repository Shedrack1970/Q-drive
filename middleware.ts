import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

// JWT secret should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// Paths that don't require authentication
const publicPaths = ["/", "/login", "/register", "/api/auth/login", "/api/auth/register", "/registration-success"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith("/static/") || path.startsWith("/_next/"),
  )

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = request.cookies.get("auth_token")?.value

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify the token
    const textEncoder = new TextEncoder()
    const secretKey = textEncoder.encode(JWT_SECRET)

    await jwtVerify(token, secretKey)

    // If token is valid, continue
    return NextResponse.next()
  } catch (error) {
    // If token is invalid, redirect to login
    console.error("Token verification failed:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /static (static files)
     * 3. /favicon.ico, /robots.txt (SEO files)
     */
    "/((?!_next|static|favicon.ico|robots.txt).*)",
  ],
}
