"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PageTransition } from "@/components/page-transition"
import { BikeIcon as Motorcycle, User, ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"passenger" | "driver">("passenger")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful",
        description: "Welcome back to Q-Drive!",
      })

      // Redirect based on user type
      if (userType === "passenger") {
        router.push("/passenger/dashboard")
      } else {
        router.push("/driver/dashboard")
      }
    }, 1500)
  }

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
              <CardTitle className="text-center text-2xl text-green-800">Welcome Back</CardTitle>
              <CardDescription className="text-center text-green-600">Log in to your Q-Drive account</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Tabs value={userType} onValueChange={(value) => setUserType(value as "passenger" | "driver")}>
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

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-green-800">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="+234 800 123 4567"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white/70"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-green-800">
                        Password
                      </Label>
                      <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white/70 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <div className="text-sm text-center">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-green-600 hover:underline">
                  Sign up
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
