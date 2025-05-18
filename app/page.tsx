"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bike, Truck, X, Menu, ChevronRight, MapPin, Clock, Shield } from "lucide-react"
import { IntroAnimation } from "@/components/intro-animation"
import { useTheme } from "next-themes"

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [appReady, setAppReady] = useState(false)
  const { theme, setTheme } = useTheme()

  // Initialize the app
  useEffect(() => {
    setAppReady(true)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  // Show nothing until the app is ready
  if (!appReady) {
    return null
  }

  // If intro is showing, only render the intro animation
  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />
  }

  // After intro completes, show the login/register screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600">
      <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white p-2 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="p-2">
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center mx-2">
              <Menu className="h-6 w-6 mr-2" />
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
        <header className="p-4 flex items-center justify-between bg-green-700/50 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 mr-3">
              <Bike className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Q-</span>
              <span className="text-2xl font-bold text-white">Drive</span>
              <Truck className="h-5 w-5 text-white ml-2" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="rounded-full text-white hover:bg-white/20 hover:text-white" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-white text-green-600 hover:bg-white/90 hover:text-green-700 rounded-full" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </header>

        <main className="px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="relative mb-12">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-500 rounded-full opacity-20"></div>

              <h1 className="text-5xl font-bold mb-4 text-white leading-tight relative z-10">
                Safe & Reliable Transportation
              </h1>
              <p className="text-white/90 text-lg mb-8 relative z-10">
                Connect with verified tricycle and motorcycle riders in your area for quick, safe, and affordable rides.
              </p>
            </div>

            <div className="space-y-4 mb-12">
              <Button
                className="w-full bg-white text-green-600 hover:bg-white/90 hover:text-green-700 py-6 rounded-xl shadow-lg flex items-center justify-center text-lg font-medium"
                asChild
              >
                <Link href="/register?type=passenger">
                  Register as Passenger
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full py-6 rounded-xl border-white text-white hover:bg-white/20 shadow-lg flex items-center justify-center text-lg font-medium"
                asChild
              >
                <Link href="/register?type=driver">
                  Register as Rider
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-16 mb-8">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">How It Works</h2>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start">
                  <div className="bg-white rounded-full p-3 mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Set Your Location</h3>
                    <p className="text-white/80">
                      Share your pickup location and destination to find available riders nearby.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start">
                  <div className="bg-white rounded-full p-3 mr-4 flex-shrink-0">
                    <Bike className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Choose Your Ride</h3>
                    <p className="text-white/80">
                      Select from available tricycles or motorcycles based on ratings and arrival time.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start">
                  <div className="bg-white rounded-full p-3 mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Track in Real-Time</h3>
                    <p className="text-white/80">Monitor your ride's progress and estimated arrival time on the map.</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start">
                  <div className="bg-white rounded-full p-3 mr-4 flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Ride Safely</h3>
                    <p className="text-white/80">
                      All riders are verified and rated to ensure your safety and comfort.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-green-900/50 backdrop-blur-sm py-8 px-4 mt-8">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white rounded-full p-2 mr-3">
                <Bike className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-white">Q-Drive</span>
              </div>
            </div>

            <div className="text-center text-white/70 text-sm mb-4">
              &copy; {new Date().getFullYear()} Q-Drive. All rights reserved.
            </div>

            <div className="flex justify-center space-x-4">
              <Link href="/terms" className="text-white/70 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-white/70 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-white/70 hover:text-white text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
