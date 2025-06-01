import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getUserFromRequest } from "@/lib/auth-helpers"
import { ObjectId } from "mongodb"
import type { Ride } from "@/types/schema"

export async function POST(request: NextRequest) {
  try {
    // Get user from token
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only passengers can request rides
    if (user.role !== "passenger") {
      return NextResponse.json({ error: "Only passengers can request rides" }, { status: 403 })
    }

    const body = await request.json()
    const { pickup, destination } = body

    // Basic validation
    if (
      !pickup ||
      !destination ||
      !pickup.latitude ||
      !pickup.longitude ||
      !destination.latitude ||
      !destination.longitude
    ) {
      return NextResponse.json({ error: "Pickup and destination coordinates are required" }, { status: 400 })
    }

    const db = await getDatabase()

    // Create ride request
    const ride: Omit<Ride, "_id"> = {
      passengerId: new ObjectId(user.userId),
      status: "requested",
      pickup,
      destination,
      requestTime: new Date(),
    }

    // Insert ride request
    const result = await db.collection("rides").insertOne(ride)

    // Return success response
    return NextResponse.json(
      {
        message: "Ride requested successfully",
        ride: { ...ride, _id: result.insertedId },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Ride request error:", error)
    return NextResponse.json({ error: "Failed to request ride" }, { status: 500 })
  }
}
