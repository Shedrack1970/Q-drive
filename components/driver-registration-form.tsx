"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Building, CheckCircle, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaceVerification } from "@/components/face-verification"
import { PageTransition } from "@/components/page-transition"

export function DriverRegistrationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    driverIdNumber: "",
    vehicleType: "",
    address: "",
    age: "",
    password: "",
    confirmPassword: "",
  })
  const [unionIdCard, setUnionIdCard] = useState<File | null>(null)
  const [selfieImage, setSelfieImage] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [showVerification, setShowVerification] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [bankTransferConfirmed, setBankTransferConfirmed] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [faceVerified, setFaceVerified] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Ensure we always set a string, never undefined
    setFormData((prev) => ({ ...prev, [name]: value || "" }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUnionIdCard(e.target.files[0])
    }
  }

  const handleTakeSelfie = () => {
    // In a real app, this would access the camera and take a photo
    // For this demo, we'll just simulate it
    setSelfieImage("/placeholder.svg?height=200&width=200")
    toast({
      title: "Selfie captured",
      description: "Your verification selfie has been captured successfully.",
    })
  }

  const handleSendVerificationCode = () => {
    setIsLoading(true)

    // Simulate sending verification code
    setTimeout(() => {
      setIsLoading(false)
      setShowVerification(true)
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the verification code.",
      })
    }, 1500)
  }

  const handleVerifyCode = () => {
    setIsLoading(true)

    // Simulate verifying code
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
      toast({
        title: "Phone verified",
        description: "Your phone number has been verified successfully.",
      })
    }, 1500)
  }

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value || "" }))
  }

  const handlePaymentSubmit = () => {
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setPaymentComplete(true)
      toast({
        title: "Payment successful",
        description: "Your $5 monthly subscription has been processed successfully.",
      })
    }, 2000)
  }

  const handleBankTransferConfirm = () => {
    setIsLoading(true)

    // Simulate verification of bank transfer
    setTimeout(() => {
      setIsLoading(false)
      setBankTransferConfirmed(true)
      setPaymentComplete(true)
      toast({
        title: "Bank transfer confirmed",
        description: "Your payment has been confirmed. Your subscription is now active.",
      })
    }, 2000)
  }

  const handleFaceVerificationComplete = (success: boolean) => {
    if (success) {
      setFaceVerified(true)
      // Proceed to next step after a short delay
      setTimeout(() => {
        setStep(3)
      }, 2000)
    }
  }

  const handleEnableNotifications = async () => {
    try {
      // Request notification permission
      const permission = await Notification.requestPermission()

      if (permission === "granted") {
        setNotificationsEnabled(true)
        toast({
          title: "Notifications enabled",
          description: "You'll receive notifications for new ride requests.",
        })

        // Send a test notification
        new Notification("Q-Drive Notifications Enabled", {
          body: "You'll now receive notifications when passengers request rides.",
          icon: "/favicon.ico",
        })
      } else {
        toast({
          title: "Notifications disabled",
          description: "You won't receive notifications for new ride requests.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      toast({
        title: "Notification error",
        description: "There was an error enabling notifications.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registration successful",
        description: "Your rider account has been created. Please wait for verification.",
      })
      router.push("/registration-success?type=driver")
    }, 2000)
  }

  if (step === 1) {
    return (
      <PageTransition>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+234 800 123 4567"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {!showVerification ? (
              <Button type="button" onClick={handleSendVerificationCode} disabled={isLoading || !formData.phoneNumber}>
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => {
                    // Ensure we always set a string, never undefined
                    const newValue = e.target.value || ""
                    setVerificationCode(newValue)
                  }}
                  placeholder="Enter 6-digit code"
                  required
                />
                <Button type="button" onClick={handleVerifyCode} disabled={isLoading || verificationCode.length !== 6}>
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </PageTransition>
    )
  }

  if (step === 2) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Face Verification</h3>
            <p className="text-sm text-gray-500">
              For security purposes, we need to verify your identity with a real-time face scan.
            </p>
          </div>

          <FaceVerification onVerificationComplete={handleFaceVerificationComplete} />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Enable Notifications</h3>
            <p className="text-sm text-gray-500">Receive notifications when passengers request rides in your area.</p>
            <Button
              type="button"
              variant={notificationsEnabled ? "outline" : "default"}
              className="w-full mt-2"
              onClick={handleEnableNotifications}
              disabled={notificationsEnabled}
            >
              {notificationsEnabled ? "Notifications Enabled ✓" : "Enable Notifications"}
            </Button>
          </div>

          {faceVerified && (
            <Button type="button" className="w-full" onClick={() => setStep(3)}>
              Continue to Personal Information
            </Button>
          )}
        </div>
      </PageTransition>
    )
  }

  if (step === 3) {
    return (
      <PageTransition>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="driverIdNumber">Rider's Identification Number</Label>
              <Input
                id="driverIdNumber"
                name="driverIdNumber"
                value={formData.driverIdNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleSelectChange("vehicleType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tricycle">Tricycle (Keke)</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle (Okada)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="unionIdCard">Upload Union ID Card</Label>
              <Input id="unionIdCard" type="file" accept="image/*" onChange={handleFileChange} required />
              <p className="text-sm text-gray-500">Upload a clear image of your union ID card</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" min="18" value={formData.age} onChange={handleChange} required />
            </div>

            <Separator className="my-2" />

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() => setStep(4)}
              disabled={
                !formData.driverIdNumber ||
                !formData.vehicleType ||
                !unionIdCard ||
                !formData.address ||
                !formData.age ||
                !formData.password ||
                formData.password !== formData.confirmPassword
              }
            >
              Continue to Payment
            </Button>

            <p className="text-xs text-gray-500 text-center mt-2">
              By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </PageTransition>
    )
  }

  if (step === 4) {
    return (
      <PageTransition>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <h3 className="font-medium text-green-800 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Monthly Subscription Required
            </h3>
            <p className="text-green-700 text-sm mt-1">
              A $5 monthly subscription is required to use Q-Drive as a rider. Your first payment will be processed now.
            </p>
          </div>

          <Tabs defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "bank")}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="card" className="transition-all duration-200">
                <CreditCard className="h-4 w-4 mr-2" />
                Card Payment
              </TabsTrigger>
              <TabsTrigger value="bank" className="transition-all duration-200">
                <Building className="h-4 w-4 mr-2" />
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4">
              {!paymentComplete ? (
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      name="cardholderName"
                      value={cardDetails.cardholderName}
                      onChange={handleCardDetailsChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleCardDetailsChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="password"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardDetailsChange}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full"
                    onClick={handlePaymentSubmit}
                    disabled={
                      isLoading ||
                      !cardDetails.cardholderName ||
                      !cardDetails.cardNumber ||
                      !cardDetails.expiryDate ||
                      !cardDetails.cvv
                    }
                  >
                    {isLoading ? "Processing..." : "Pay $5.00"}
                  </Button>
                </form>
              ) : (
                <div className="text-center p-4 space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <h3 className="font-medium text-lg">Payment Successful!</h3>
                  <p className="text-gray-600">Your subscription is active until {getNextMonthDate()}.</p>
                  <Button type="button" className="w-full" onClick={handleSubmit}>
                    Complete Registration
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="bank" className="space-y-4">
              {!bankTransferConfirmed ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bank Transfer Details</CardTitle>
                      <CardDescription>
                        Please transfer $5.00 to the account below and click "I've Made the Transfer" when done.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Account Number:</span>
                        <span>0167245886</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Bank:</span>
                        <span>Union Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Account Name:</span>
                        <span>Shedrack Chinonso Ugoh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Amount:</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Reference:</span>
                        <span>QDRIVE-{formData.phoneNumber.replace(/[^0-9]/g, "")}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Button type="button" className="w-full" onClick={handleBankTransferConfirm} disabled={isLoading}>
                    {isLoading ? "Confirming..." : "I've Made the Transfer"}
                  </Button>
                </div>
              ) : (
                <div className="text-center p-4 space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <h3 className="font-medium text-lg">Payment Confirmed!</h3>
                  <p className="text-gray-600">Your subscription is active until {getNextMonthDate()}.</p>
                  <Button type="button" className="w-full" onClick={handleSubmit}>
                    Complete Registration
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    )
  }

  return null
}

function getNextMonthDate() {
  const date = new Date()
  date.setMonth(date.getMonth() + 1)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
