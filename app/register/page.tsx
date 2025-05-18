"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DriverRegistrationForm } from "@/components/driver-registration-form"
import { PassengerRegistrationForm } from "@/components/passenger-registration-form"
import { PageTransition } from "@/components/page-transition"
import { BikeIcon as Motorcycle, User, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"passenger" | "driver">("passenger")

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "driver" || type === "passenger") {
      setActiveTab(type)
    }
  }, [searchParams])

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="absolute top-0 left-0 w-full h-48 bg-green-600 rounded-b-[40px] shadow-lg"></div>

        <div className="container mx-auto px-4 py-10 flex flex-col items-center min-h-screen relative z-10">
          <Link href="/" className="self-start mb-8 flex items-center gap-2 text-white">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Motorcycle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <Card className="w-full max-w-md border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-2xl text-green-800">Create an Account</CardTitle>
              <CardDescription className="text-center text-green-600">
                Choose your account type to get started with Q-Drive
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "passenger" | "driver")}>
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-green-100/50 p-1 rounded-lg">
                  <TabsTrigger
                    value="passenger"
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
                  >
                    <User className="h-4 w-4" />
                    Passenger
                  </TabsTrigger>
                  <TabsTrigger
                    value="driver"
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
                  >
                    <Motorcycle className="h-4 w-4" />
                    Driver
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="passenger">
                  <PassengerRegistrationForm />
                </TabsContent>

                <TabsContent value="driver">
                  <DriverRegistrationForm />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-green-600 hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Q-Drive. All rights reserved.
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
