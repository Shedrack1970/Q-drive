"use client"

import { useState, useEffect } from "react"
import { AlertCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LocationCheck() {
  const [locationStatus, setLocationStatus] = useState<"checking" | "granted" | "denied" | "unavailable">("checking")
  const [isVpnDetected, setIsVpnDetected] = useState(false)

  useEffect(() => {
    checkLocationPermission()
    detectVpn()
  }, [])

  const checkLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable")
      return
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted") {
          setLocationStatus("granted")
          startLocationTracking()
        } else if (result.state === "prompt") {
          requestLocation()
        } else {
          setLocationStatus("denied")
        }

        // Listen for changes to permission
        result.addEventListener("change", () => {
          if (result.state === "granted") {
            setLocationStatus("granted")
            startLocationTracking()
          } else {
            setLocationStatus("denied")
          }
        })
      })
      .catch(() => {
        setLocationStatus("unavailable")
      })
  }

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus("granted")
        startLocationTracking()
      },
      () => {
        setLocationStatus("denied")
      },
      { enableHighAccuracy: true },
    )
  }

  const startLocationTracking = () => {
    // Start continuous location tracking
    navigator.geolocation.watchPosition(
      (position) => {
        // Store the position or send to server
        const { latitude, longitude, accuracy } = position.coords
        console.log("Location updated:", { latitude, longitude, accuracy })

        // You could store this in state or context, or send to an API
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            latitude,
            longitude,
            accuracy,
            timestamp: position.timestamp,
          }),
        )
      },
      (error) => {
        console.error("Error tracking location:", error)
        setLocationStatus("denied")
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000, // 30 seconds
        timeout: 27000, // 27 seconds
      },
    )
  }

  const detectVpn = () => {
    // This is a simplified VPN detection
    // In a real app, you would use more sophisticated methods
    // such as checking for WebRTC leaks, IP reputation services, etc.

    // For demo purposes, we'll use a simple timing check
    // which can sometimes indicate proxying
    const start = performance.now()

    fetch("https://www.google.com/generate_204")
      .then(() => {
        const latency = performance.now() - start
        // Unusually low or high latency might indicate VPN
        // This is just a simple heuristic and not reliable
        if (latency < 10 || latency > 1000) {
          setIsVpnDetected(true)
        }
      })
      .catch(() => {
        // Network error could indicate VPN or firewall
        setIsVpnDetected(true)
      })
  }

  if (locationStatus === "checking") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-green-500 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2 dark:text-white">Checking Location...</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Please wait while we verify your location settings.
          </p>
        </div>
      </div>
    )
  }

  if (locationStatus === "denied" || locationStatus === "unavailable") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2 dark:text-white">Location Access Required</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
            Q-Drive needs access to your location to connect you with nearby drivers. Please enable location services to
            continue.
          </p>
          <div className="flex justify-center">
            <Button onClick={requestLocation} className="bg-green-500 hover:bg-green-600">
              Enable Location
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            If the button doesn't work, please enable location access in your device settings and refresh the page.
          </p>
        </div>
      </div>
    )
  }

  if (isVpnDetected) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 dark:bg-yellow-900 p-3 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              VPN detected. For accurate location services, please disable your VPN.
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-yellow-800 dark:text-yellow-200">
            Dismiss
          </Button>
        </div>
      </div>
    )
  }

  // If location is granted and no VPN detected, return null (no UI)
  return null
}
