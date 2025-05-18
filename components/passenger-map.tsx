"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation } from "lucide-react"

interface PassengerMapProps {
  showDrivers?: boolean
  showRoute?: boolean
}

export function PassengerMap({ showDrivers = false, showRoute = false }: PassengerMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden rounded-lg">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* This is a placeholder for the actual Google Maps integration */}
          <div className="absolute inset-0 bg-[#e8f0fe]">
            {/* Simulated roads */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300"></div>
            <div className="absolute top-2/4 left-0 right-0 h-1 bg-gray-300"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-1 bg-gray-300"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300"></div>

            {/* Passenger location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Nearby drivers */}
            {showDrivers && (
              <>
                <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Navigation className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Navigation className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Navigation className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {showRoute && (
              <>
                {/* Simulated route */}
                <div className="absolute top-1/2 left-1/2 w-1/3 h-1 bg-blue-500 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-5/6 h-1/4 w-1 bg-blue-500"></div>

                {/* Destination pin */}
                <div className="absolute top-3/4 left-5/6 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -top-6 -left-3 w-6 h-6 text-red-500">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Driver location */}
                <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <Navigation className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
              <span className="text-gray-700 font-bold">+</span>
            </button>
            <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
              <span className="text-gray-700 font-bold">-</span>
            </button>
          </div>

          {/* Current location button */}
          <div className="absolute bottom-4 left-4">
            <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
              <Navigation className="h-5 w-5 text-blue-500" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
