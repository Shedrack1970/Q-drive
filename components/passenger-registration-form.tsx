"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, CheckCircle } from "lucide-react"

export function PassengerRegistrationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registration successful",
        description: "Welcome to Q-Drive!",
      })
      router.push("/registration-success")
    }, 1500)
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "" }
    if (password.length < 6) return { strength: 1, text: "Weak" }
    if (password.length < 10) return { strength: 2, text: "Medium" }
    return { strength: 3, text: "Strong" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-green-800">
          Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white/70"
        />
      </div>

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
        <Label htmlFor="email" className="text-green-800">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white/70"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-green-800">
          Password
        </Label>
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
        {formData.password && (
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    passwordStrength.strength === 1
                      ? "bg-red-500"
                      : passwordStrength.strength === 2
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                ></div>
              </div>
              <span
                className={`text-xs ${
                  passwordStrength.strength === 1
                    ? "text-red-500"
                    : passwordStrength.strength === 2
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {passwordStrength.text}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-green-800">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white/70 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {formData.password && formData.confirmPassword && (
          <div className="flex items-center mt-1">
            {formData.password === formData.confirmPassword ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">Passwords match</span>
              </>
            ) : (
              <span className="text-xs text-red-500">Passwords do not match</span>
            )}
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl shadow-md"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>

      <div className="text-xs text-center text-gray-500 mt-4">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-green-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-green-600 hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </form>
  )
}
