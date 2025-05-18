"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Clock, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DriverCardProps {
  driver: {
    id: string
    name: string
    rating: number
    vehicleType: string
    vehicleColor: string
    vehicleNumber: string
    distance: string
    estimatedArrival: string
  }
  onSelect: () => void
}

export function DriverCard({ driver, onSelect }: DriverCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{driver.name}</p>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs ml-1">{driver.rating}</span>
                </div>
              </div>
              <Badge variant="outline" className="ml-2">
                {driver.vehicleType}
              </Badge>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              <p>
                {driver.vehicleColor} • {driver.vehicleNumber}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Navigation className="h-3.5 w-3.5 text-gray-500" />
                  <span>{driver.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                  <span>{driver.estimatedArrival}</span>
                </div>
              </div>
            </div>

            <Button onClick={onSelect} className="w-full mt-3 transition-all duration-200 hover:scale-105">
              Select Driver
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
