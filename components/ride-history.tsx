"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Navigation } from "lucide-react"

// Mock data for ride history
const mockRideHistory = [
  {
    id: "ride1",
    date: "May 15, 2025",
    time: "10:30 AM",
    driverName: "John Doe",
    driverRating: 4.8,
    vehicleType: "Tricycle",
    vehicleColor: "Blue",
    vehicleNumber: "KJA-123-XY",
    pickupLocation: "Ikeja City Mall",
    destination: "Lekki Phase 1",
    status: "completed",
    price: "₦1,800",
  },
  {
    id: "ride2",
    date: "May 14, 2025",
    time: "2:15 PM",
    driverName: "Sarah Smith",
    driverRating: 4.9,
    vehicleType: "Motorcycle",
    vehicleColor: "Red",
    vehicleNumber: "LGS-456-AB",
    pickupLocation: "Victoria Island",
    destination: "Ajah",
    status: "completed",
    price: "₦2,500",
  },
  {
    id: "ride3",
    date: "May 12, 2025",
    time: "9:45 AM",
    driverName: "Michael Johnson",
    driverRating: 4.7,
    vehicleType: "Tricycle",
    vehicleColor: "Green",
    vehicleNumber: "ABJ-789-CD",
    pickupLocation: "Surulere",
    destination: "Yaba",
    status: "cancelled",
    price: "₦1,200",
  },
  {
    id: "ride4",
    date: "May 10, 2025",
    time: "5:30 PM",
    driverName: "David Wilson",
    driverRating: 4.6,
    vehicleType: "Motorcycle",
    vehicleColor: "Black",
    vehicleNumber: "KJA-321-ZY",
    pickupLocation: "Ikoyi",
    destination: "Victoria Island",
    status: "completed",
    price: "₦1,500",
  },
  {
    id: "ride5",
    date: "May 8, 2025",
    time: "11:20 AM",
    driverName: "Emma Brown",
    driverRating: 4.8,
    vehicleType: "Tricycle",
    vehicleColor: "Yellow",
    vehicleNumber: "LGS-654-BA",
    pickupLocation: "Lekki Phase 2",
    destination: "Ajah",
    status: "completed",
    price: "₦2,200",
  },
]

interface RideHistoryProps {
  limit?: number
}

export function RideHistory({ limit }: RideHistoryProps) {
  const [expandedRide, setExpandedRide] = useState<string | null>(null)

  const toggleRideDetails = (rideId: string) => {
    if (expandedRide === rideId) {
      setExpandedRide(null)
    } else {
      setExpandedRide(rideId)
    }
  }

  const rides = limit ? mockRideHistory.slice(0, limit) : mockRideHistory

  return (
    <div className="space-y-3">
      {rides.length > 0 ? (
        rides.map((ride) => (
          <Card
            key={ride.id}
            className={`overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer ${
              expandedRide === ride.id ? "shadow-md" : ""
            }`}
            onClick={() => toggleRideDetails(ride.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        ride.status === "completed" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {ride.status === "completed" ? (
                        <Navigation
                          className={`h-5 w-5 ${ride.status === "completed" ? "text-green-600" : "text-red-600"}`}
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-600"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={ride.status === "completed" ? "default" : "destructive"} className="capitalize">
                        {ride.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {ride.date} • {ride.time}
                      </span>
                    </div>
                    <p className="font-medium mt-1">{ride.price}</p>
                    <div className="mt-1 text-sm">
                      <div className="flex items-start">
                        <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5 mr-1 flex-shrink-0" />
                        <span className="text-gray-700">{ride.pickupLocation}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5 mr-1 flex-shrink-0" />
                        <span className="text-gray-700">{ride.destination}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {expandedRide === ride.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{ride.driverName}</p>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-yellow-400 fill-yellow-400"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span className="text-xs ml-1">{ride.driverRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Vehicle</p>
                      <p>
                        {ride.vehicleType} • {ride.vehicleColor}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Vehicle Number</p>
                      <p>{ride.vehicleNumber}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Date & Time</p>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {ride.date} at {ride.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No ride history available.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
