"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface RideRequestProps {
  request: {
    id: string
    passengerName: string
    passengerRating: number
    pickupLocation: string
    destination: string
    estimatedDistance: string
    estimatedDuration: string
    offeredPrice?: string
  }
  onAccept: () => void
}

export function RideRequest({ request, onAccept }: RideRequestProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarFallback>{request.passengerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{request.passengerName}</p>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs ml-1">{request.passengerRating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-xs text-gray-500">Pickup:</div>
            <div className="text-sm font-medium">{request.pickupLocation}</div>
          </div>
          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-xs text-gray-500">Destination:</div>
            <div className="text-sm font-medium">{request.destination}</div>
          </div>
          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-xs text-gray-500">Distance:</div>
            <div className="text-sm">{request.estimatedDistance}</div>
          </div>
          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-xs text-gray-500">Duration:</div>
            <div className="text-sm">{request.estimatedDuration}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 pt-0">
        <Button onClick={onAccept} className="transition-all duration-200 hover:scale-105">
          Accept Request
        </Button>
      </CardFooter>
    </Card>
  )
}
