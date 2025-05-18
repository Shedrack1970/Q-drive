"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PassengerHeader } from "@/components/passenger-header"
import { PassengerMap } from "@/components/passenger-map"

// Mock data for nearby drivers
const nearbyDrivers = [
  {
    id: "driver1",
    name: "John Doe",
    rating: 4.8,
    vehicleType: "Tricycle",
    vehicleSubtype: "Keke",
    distance: "0.5 km",
    estimatedArrival: "5 mins",
  },
  {
    id: "driver2",
    name: "Sarah Johnson",
    rating: 4.6,
    vehicleType: "Motorcycle",
    vehicleSubtype: "Okada",
    distance: "1.2 km",
    estimatedArrival: "8 mins",
  },
  {
    id: "driver3",
    name: "Michael Brown",
    rating: 4.9,
    vehicleType: "Tricycle",
    vehicleSubtype: "Keke",
    distance: "1.8 km",
    estimatedArrival: "12 mins",
  },
]

export default function PassengerDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("find")
  const [pickupLocation, setPickupLocation] = useState("Current Location")
  const [destination, setDestination] = useState("")
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null)

  const handleSelectDriver = (driver: any) => {
    setSelectedDriver(driver)
    setActiveTab("active")

    toast({
      title: "Driver selected",
      description: `You've selected ${driver.name} for your ride.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 bg-black text-white p-2 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <div className="flex items-center mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <path d="M11 18H8a2 2 0 0 1-2-2V9" />
              </svg>
              <div>
                <div>Q-Drive</div>
                <div className="text-xs text-gray-400">v0-voice-mode-availability-j6nh2h3tr.vercel.app</div>
              </div>
            </div>
          </div>
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-more-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pt-16">
        <PassengerHeader />

        <main className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 p-1 rounded-md">
              <TabsTrigger
                value="find"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Find Ride
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Active Ride
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="find" className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center bg-gray-100 p-3 rounded-md">
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
                        className="text-gray-500 mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="1" />
                      </svg>
                      <div className="flex-1">Current Location</div>
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
                        className="text-gray-500"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center bg-gray-100 p-3 rounded-md">
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
                        className="text-gray-500 mr-2"
                      >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Where to?"
                        className="flex-1 bg-transparent border-none outline-none"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
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
                        className="text-gray-500"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[250px] rounded-lg overflow-hidden bg-gray-200 relative">
                <PassengerMap showDrivers={true} />
                <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-md text-sm">Nigeria</div>
                <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-md text-sm">Map data © 2025</div>
              </div>

              <h3 className="text-xl font-semibold">Available Riders Nearby</h3>
              <div className="space-y-4">
                {nearbyDrivers.map((driver) => (
                  <div key={driver.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                        {driver.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium text-lg">{driver.name}</div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="gold"
                              className="w-5 h-5 mr-1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{driver.rating}</span>
                          </div>
                        </div>
                        <div className="text-gray-500 mb-2">
                          {driver.vehicleType} ({driver.vehicleSubtype})
                        </div>
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-500 mr-1"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span className="text-sm">{driver.estimatedArrival}</span>
                          </div>
                          <div className="text-sm">{driver.distance} away</div>
                        </div>
                        <Button
                          className="w-full bg-green-500 hover:bg-green-600"
                          onClick={() => handleSelectDriver(driver)}
                        >
                          Select Rider
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active">{/* Active ride content */}</TabsContent>

            <TabsContent value="history">{/* Ride history content */}</TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
