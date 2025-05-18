"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { DriverMap } from "@/components/driver-map"
import { DriverHeader } from "@/components/driver-header"
import { DriverEarnings } from "@/components/driver-earnings"
import { Navigation } from "lucide-react"

// Mock data for ride requests
const rideRequests = [
  {
    id: "request1",
    passengerName: "Emma Wilson",
    passengerRating: 4.7,
    pickupLocation: "Ikeja City Mall",
    destination: "Lekki Phase 1",
    estimatedDistance: "12.5 km",
    estimatedDuration: "35 mins",
    offeredPrice: "₦1,800",
  },
  {
    id: "request2",
    passengerName: "David Chen",
    passengerRating: 4.9,
    pickupLocation: "Victoria Island",
    destination: "Ajah",
    estimatedDistance: "18.2 km",
    estimatedDuration: "45 mins",
    offeredPrice: "₦2,500",
  },
]

export default function DriverDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("requests")
  const [isOnline, setIsOnline] = useState(false)
  const [activeRide, setActiveRide] = useState<any | null>(null)

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
    toast({
      title: isOnline ? "You're now offline" : "You're now online",
      description: isOnline
        ? "You won't receive ride requests while offline."
        : "You'll now receive ride requests from nearby passengers.",
    })
  }

  const handleAcceptRide = (request: any) => {
    setActiveRide(request)
    setActiveTab("active")

    toast({
      title: "Request accepted",
      description: `You've accepted a ride request from ${request.passengerName}.`,
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
        <DriverHeader />

        <main className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
              <span className="font-medium">{isOnline ? "Online" : "Offline"}</span>
            </div>
            <div className="relative w-12 h-6 bg-gray-200 rounded-full">
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform ${
                  isOnline ? "bg-green-500 translate-x-6" : "bg-white"
                }`}
              ></div>
              <input
                type="checkbox"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                checked={isOnline}
                onChange={handleToggleOnline}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 p-1 rounded-md">
              <TabsTrigger
                value="requests"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Requests
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Active Ride
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Statistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4">
              {isOnline ? (
                <>
                  <div className="h-[250px] mb-4 rounded-lg overflow-hidden bg-gray-200">
                    <DriverMap />
                    <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-md text-sm">
                      Map data © 2025
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">Ride Requests</h3>
                  {rideRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-lg p-4 shadow-sm mb-3">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                          {request.passengerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{request.passengerName}</div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="gold"
                              className="w-4 h-4 mr-1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm">{request.passengerRating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-start">
                          <div className="mr-2">
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
                              className="text-gray-500"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <circle cx="12" cy="12" r="1" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Pickup</div>
                            <div className="text-gray-500">{request.pickupLocation}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2">
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
                              className="text-gray-500"
                            >
                              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Destination</div>
                            <div className="text-gray-500">{request.destination}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
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
                          <span className="text-sm">{request.estimatedDuration}</span>
                        </div>
                        <div className="text-sm">{request.estimatedDistance}</div>
                        <Button variant="link" className="text-sm p-0">
                          View Details
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="w-full">
                          Decline
                        </Button>
                        <Button
                          className="w-full bg-green-500 hover:bg-green-600"
                          onClick={() => handleAcceptRide(request)}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Navigation className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">You're Offline</h3>
                  <p className="text-gray-500 mb-6">Go online to receive ride requests from passengers.</p>
                  <Button onClick={handleToggleOnline} className="bg-green-500 hover:bg-green-600">
                    Go Online
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active">{/* Active ride content */}</TabsContent>

            <TabsContent value="statistics">
              <DriverEarnings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
