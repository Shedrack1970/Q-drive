import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

// JWT secret should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function getUserFromRequest(request: NextRequest) {
  try {
    // Get the token from the cookies
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return null
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded as { userId: string; email: string; role: string }
  } catch (error) {
    console.error("Error getting user from request:", error)
    return null
  }
}
