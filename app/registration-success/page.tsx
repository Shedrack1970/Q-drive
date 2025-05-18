"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/page-transition"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function RegistrationSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(5)
  const userType = searchParams.get("type") || "passenger"

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirect based on user type
          if (userType === "driver") {
            router.push("/driver/dashboard")
          } else {
            router.push("/passenger/dashboard")
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, userType])

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h1>

          <p className="text-gray-600 mb-6">
            {userType === "driver"
              ? "Your driver account has been created successfully. You can now start accepting ride requests."
              : "Your passenger account has been created successfully. You can now book rides."}
          </p>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-700">
              You will be redirected to your dashboard in <span className="font-bold">{countdown}</span> seconds...
            </p>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl shadow-md"
            onClick={() => {
              if (userType === "driver") {
                router.push("/driver/dashboard")
              } else {
                router.push("/passenger/dashboard")
              }
            }}
          >
            Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
