"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      toast({
        title: "Payment successful",
        description: "Your subscription has been renewed for 30 days.",
      })
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">Payment Successful</CardTitle>
            <CardDescription className="text-center">Your subscription has been renewed for 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Amount Paid</span>
                <span className="font-medium">$5.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Payment Method</span>
                <span className="font-medium">{paymentMethod === "card" ? "Credit/Debit Card" : "Bank Transfer"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">New Expiry Date</span>
                <span className="font-medium">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/driver/dashboard">Return to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Renew Subscription</CardTitle>
          <CardDescription>Your monthly driver subscription fee is $5.00</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Subscription Fee</span>
              <span className="font-medium">$5.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Duration</span>
              <span className="font-medium">30 days</span>
            </div>
          </div>

          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <RadioGroup
              id="payment-method"
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "card" | "bank")}
              className="mt-2"
            >
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  Credit/Debit Card
                </Label>
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer">
                  Bank Transfer
                </Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {paymentMethod === "card" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay $5.00"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium">Bank Details</p>
                  <p className="text-sm text-gray-500">Please transfer the exact amount to:</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Account Number:</span>
                    <span className="font-medium">0167245886</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bank:</span>
                    <span className="font-medium">Union Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Account Name:</span>
                    <span className="font-medium">Shedrack Chinonso Ugoh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount:</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Reference:</span>
                    <span className="font-medium">QDRIVE-{Math.floor(Math.random() * 10000)}</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full" disabled={isProcessing}>
                {isProcessing ? "Confirming..." : "I've Made the Transfer"}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/driver/dashboard">
              <ArrowRight className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
