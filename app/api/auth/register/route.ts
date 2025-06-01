import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import type { User } from "@/types/schema"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, role } = body

    // Basic validation
    if (!email || !password || !name || !phone || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if role is valid
    if (role !== "passenger" && role !== "driver") {
      return NextResponse.json({ error: "Invalid role. Must be passenger or driver" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user object
    const user: Omit<User, "_id"> = {
      email,
      password: hashedPassword,
      name,
      phone,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add role-specific fields
    if (role === "driver" && body.licenseNumber) {
      Object.assign(user, {
        licenseNumber: body.licenseNumber,
        vehicleDetails: body.vehicleDetails || {},
        isVerified: false,
        isActive: false,
      })
    }

    // Insert user
    const result = await db.collection("users").insertOne(user)

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { ...userWithoutPassword, _id: result.insertedId },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
