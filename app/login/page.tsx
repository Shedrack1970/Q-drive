"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { PageTransition } from "@/components/page-transition"
import { BikeIcon as Motorcycle, User, ArrowLeft, EyeOff, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"passenger" | "driver">("passenger")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
      <div className="min-h-screen relative overflow-hidden">
        {/* Brick Wall Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23334155' fillOpacity='0.8'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundColor: "#1e293b",
          }}
        ></div>

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-slate-900/90"></div>

        {/* Moving Vehicle Animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Bike Animation */}
          <div className="absolute top-1/4 -left-20 animate-[moveRight_15s_linear_infinite]">
            <Motorcycle className="h-12 w-12 text-green-400/20 transform rotate-12" />
          </div>

          {/* Tricycle Animation */}
          <div className="absolute top-3/4 -right-20 animate-[moveLeft_20s_linear_infinite]">
            <div className="flex items-center text-green-400/15">
              <div className="w-3 h-3 rounded-full border-2 border-current mr-1"></div>
              <div className="w-6 h-4 border-2 border-current rounded"></div>
              <div className="w-3 h-3 rounded-full border-2 border-current ml-1"></div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-8 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </Link>

        {/* User Type Toggle - Top Right */}
        <div className="absolute top-8 right-6 z-20">
          <div className="relative bg-white/10 rounded-full p-1 backdrop-blur-sm border border-white/20">
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-transform duration-300 ease-out shadow-lg ${
                userType === "driver" ? "translate-x-full" : "translate-x-0"
              }`}
            ></div>
            <button
              type="button"
              onClick={() => setUserType("passenger")}
              className={`relative z-10 flex items-center gap-1 px-3 py-2 rounded-full transition-colors duration-300 text-xs ${
                userType === "passenger" ? "text-white" : "text-white/70"
              }`}
            >
              <User className="h-3 w-3" />
              Passenger
            </button>
            <button
              type="button"
              onClick={() => setUserType("driver")}
              className={`relative z-10 flex items-center gap-1 px-3 py-2 rounded-full transition-colors duration-300 text-xs ${
                userType === "driver" ? "text-white" : "text-white/70"
              }`}
            >
              <Motorcycle className="h-3 w-3" />
              Driver
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen p-6">
          {/* Spotlight Effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 pointer-events-none">
            {/* Lamp/Light Source */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-lg shadow-lg"></div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-b-lg"></div>

            {/* Light Beam */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[100px] border-r-[100px] border-t-[200px] border-l-transparent border-r-transparent border-t-yellow-200/30"></div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[80px] border-r-[80px] border-t-[160px] border-l-transparent border-r-transparent border-t-yellow-100/40"></div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[60px] border-r-[60px] border-t-[120px] border-l-transparent border-r-transparent border-t-white/20"></div>
          </div>

          {/* Login Form Container */}
          <div className="relative z-10 w-full max-w-md mt-32">
            {/* Glass Container */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Input */}
                  <div className="relative">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Username"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/30 rounded-full px-6 py-4 pr-12 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/15 focus:border-white/50 transition-all duration-300 text-lg"
                    />
                    <User className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/30 rounded-full px-6 py-4 pr-12 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/15 focus:border-white/50 transition-all duration-300 text-lg"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-white cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 border-white/40 transition-all duration-200 ${rememberMe ? "bg-white" : "bg-transparent"}`}
                        >
                          {rememberMe && (
                            <svg
                              className="w-3 h-3 text-blue-600 absolute top-0.5 left-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      Remember me
                    </label>
                    <Link href="/forgot-password" className="text-white hover:text-white/80 transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-4 font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        Logging in...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>

                {/* Register Link */}
                <div className="text-center mt-6">
                  <span className="text-white">Don't have an account? </span>
                  <Link href="/register" className="text-white font-semibold hover:underline transition-all">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes moveRight {
            from { transform: translateX(-100px) rotate(12deg); }
            to { transform: translateX(calc(100vw + 100px)) rotate(12deg); }
          }
          
          @keyframes moveLeft {
            from { transform: translateX(calc(100vw + 100px)); }
            to { transform: translateX(-100px); }
          }
        `}</style>
      </div>
    </PageTransition>
  )
}
