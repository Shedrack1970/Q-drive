import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  email: string
  password: string // This should be hashed
  name: string
  phone: string
  role: "passenger" | "driver"
  profilePicture?: string
  createdAt: Date
  updatedAt: Date
}

export interface Driver extends User {
  role: "driver"
  licenseNumber: string
  vehicleDetails: {
    make: string
    model: string
    year: string
    color: string
    licensePlate: string
  }
  isVerified: boolean
  isActive: boolean
  currentLocation?: {
    latitude: number
    longitude: number
    lastUpdated: Date
  }
  rating?: number
  subscriptionStatus?: "free" | "basic" | "premium"
  subscriptionExpiry?: Date
}

export interface Passenger extends User {
  role: "passenger"
  savedLocations?: {
    name: string
    latitude: number
    longitude: number
  }[]
  paymentMethods?: {
    type: string
    lastFour?: string
    isDefault: boolean
  }[]
}

export interface Ride {
  _id?: ObjectId
  passengerId: ObjectId
  driverId?: ObjectId
  status: "requested" | "accepted" | "in-progress" | "completed" | "cancelled"
  pickup: {
    latitude: number
    longitude: number
    address?: string
  }
  destination: {
    latitude: number
    longitude: number
    address?: string
  }
  requestTime: Date
  acceptTime?: Date
  startTime?: Date
  endTime?: Date
  fare?: number
  distance?: number
  duration?: number
  paymentStatus?: "pending" | "completed" | "failed"
  paymentMethod?: string
  rating?: number
  feedback?: string
}
