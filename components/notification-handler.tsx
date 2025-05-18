"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { usePathname } from "next/navigation"

export function NotificationHandler() {
  const { toast } = useToast()
  const pathname = usePathname()
  const [isDriver, setIsDriver] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  useEffect(() => {
    // Check if user is a driver based on the URL path
    setIsDriver(pathname.includes("/driver"))

    // Request notification permission on component mount
    requestNotificationPermission()

    // Set up mock ride request notifications for drivers
    let notificationInterval: NodeJS.Timeout | null = null

    if (isDriver && notificationsEnabled) {
      // Simulate receiving ride requests every 30-60 seconds
      notificationInterval = setInterval(
        () => {
          const shouldSendNotification = Math.random() > 0.5
          if (shouldSendNotification) {
            sendRideRequestNotification()
          }
        },
        30000 + Math.random() * 30000,
      )
    }

    return () => {
      if (notificationInterval) {
        clearInterval(notificationInterval)
      }
    }
  }, [pathname, isDriver, notificationsEnabled])

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive",
      })
      return
    }

    if (Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission()

        if (permission === "granted") {
          setNotificationsEnabled(true)
          toast({
            title: "Notifications enabled",
            description: "You'll receive notifications for ride updates.",
          })

          // Send a welcome notification
          new Notification("Q-Drive Notifications Enabled", {
            body: "You'll now receive notifications for ride updates and requests.",
            icon: "/favicon.ico",
          })
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error)
      }
    } else if (Notification.permission === "granted") {
      setNotificationsEnabled(true)
    }
  }

  const sendRideRequestNotification = () => {
    if (!notificationsEnabled) return

    // Generate random passenger details
    const passengers = [
      { name: "Emma Wilson", rating: 4.7, pickup: "Ikeja City Mall", destination: "Lekki Phase 1" },
      { name: "David Chen", rating: 4.9, pickup: "Victoria Island", destination: "Ajah" },
      { name: "Sarah Johnson", rating: 4.8, pickup: "Surulere", destination: "Yaba" },
      { name: "Michael Brown", rating: 4.6, pickup: "Ikoyi", destination: "Maryland" },
    ]

    const passenger = passengers[Math.floor(Math.random() * passengers.length)]

    // Create and show notification
    const notification = new Notification("New Ride Request", {
      body: `${passenger.name} (${passenger.rating}★) needs a ride from ${passenger.pickup} to ${passenger.destination}`,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      vibrate: [200, 100, 200],
      tag: "ride-request",
      renotify: true,
    })

    // Handle notification click
    notification.onclick = () => {
      // Focus on the window and navigate to the ride request
      window.focus()
      // In a real app, you would navigate to the specific ride request
      // window.location.href = `/driver/requests/${requestId}`

      notification.close()
    }

    // Also show an in-app toast
    toast({
      title: "New Ride Request",
      description: `${passenger.name} needs a ride from ${passenger.pickup} to ${passenger.destination}`,
      variant: "default",
      duration: 10000,
    })
  }

  // This component doesn't render anything
  return null
}
