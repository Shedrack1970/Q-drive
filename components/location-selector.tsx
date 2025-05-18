"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Navigation, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LocationSelectorProps {
  pickupLocation: string
  destination: string
  onPickupChange: (value: string) => void
  onDestinationChange: (value: string) => void
}

// Mock data for location suggestions
const locationSuggestions = [
  "Ikeja City Mall, Ikeja",
  "Lekki Phase 1, Lagos",
  "Victoria Island, Lagos",
  "Ajah, Lagos",
  "Surulere, Lagos",
  "Yaba, Lagos",
  "Ikoyi, Lagos",
  "Maryland Mall, Lagos",
  "Computer Village, Ikeja",
  "Oshodi, Lagos",
]

export function LocationSelector({
  pickupLocation,
  destination,
  onPickupChange,
  onDestinationChange,
}: LocationSelectorProps) {
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)
  const [filteredPickupSuggestions, setFilteredPickupSuggestions] = useState<string[]>([])
  const [filteredDestinationSuggestions, setFilteredDestinationSuggestions] = useState<string[]>([])

  const handlePickupFocus = () => {
    if (pickupLocation) {
      const filtered = locationSuggestions.filter((loc) => loc.toLowerCase().includes(pickupLocation.toLowerCase()))
      setFilteredPickupSuggestions(filtered)
    } else {
      setFilteredPickupSuggestions(locationSuggestions)
    }
    setShowPickupSuggestions(true)
  }

  const handleDestinationFocus = () => {
    if (destination) {
      const filtered = locationSuggestions.filter((loc) => loc.toLowerCase().includes(destination.toLowerCase()))
      setFilteredDestinationSuggestions(filtered)
    } else {
      setFilteredDestinationSuggestions(locationSuggestions)
    }
    setShowDestinationSuggestions(true)
  }

  const handlePickupChange = (value: string) => {
    onPickupChange(value)
    const filtered = locationSuggestions.filter((loc) => loc.toLowerCase().includes(value.toLowerCase()))
    setFilteredPickupSuggestions(filtered)
  }

  const handleDestinationChange = (value: string) => {
    onDestinationChange(value)
    const filtered = locationSuggestions.filter((loc) => loc.toLowerCase().includes(value.toLowerCase()))
    setFilteredDestinationSuggestions(filtered)
  }

  const handlePickupSelect = (location: string) => {
    onPickupChange(location)
    setShowPickupSuggestions(false)
  }

  const handleDestinationSelect = (location: string) => {
    onDestinationChange(location)
    setShowDestinationSuggestions(false)
  }

  const handleUseCurrentLocation = () => {
    // In a real app, this would use the Geolocation API
    onPickupChange("Current Location (Detected)")
    setShowPickupSuggestions(false)
  }

  const handleClearPickup = () => {
    onPickupChange("")
  }

  const handleClearDestination = () => {
    onDestinationChange("")
  }

  const handleSwapLocations = () => {
    const temp = pickupLocation
    onPickupChange(destination)
    onDestinationChange(temp)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label htmlFor="pickup" className="text-sm font-medium">
          Pickup Location
        </Label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="pickup"
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChange={(e) => handlePickupChange(e.target.value)}
            onFocus={handlePickupFocus}
            onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
            className="pl-10 pr-10"
          />
          {pickupLocation && (
            <button
              type="button"
              onClick={handleClearPickup}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        {showPickupSuggestions && filteredPickupSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <Button
              variant="ghost"
              className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={handleUseCurrentLocation}
            >
              <Navigation className="h-4 w-4 mr-2 text-blue-500" />
              Use current location
            </Button>
            {filteredPickupSuggestions.map((location, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handlePickupSelect(location)}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border"
          onClick={handleSwapLocations}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </Button>
      </div>

      <div className="relative">
        <Label htmlFor="destination" className="text-sm font-medium">
          Destination
        </Label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onFocus={handleDestinationFocus}
            onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
            className="pl-10 pr-10"
          />
          {destination && (
            <button
              type="button"
              onClick={handleClearDestination}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        {showDestinationSuggestions && filteredDestinationSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredDestinationSuggestions.map((location, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDestinationSelect(location)}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
