"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubscriptionStatusProps {
  status: "active" | "expiring-soon" | "expired"
  daysLeft: number
}

export function SubscriptionStatus({ status, daysLeft }: SubscriptionStatusProps) {
  if (status === "active" && daysLeft > 3) {
    return null
  }

  const handleRenew = () => {
    // In a real app, this would navigate to a payment page
    window.location.href = "/driver/subscription"
  }

  return (
    <Alert
      variant={status === "expired" ? "destructive" : status === "expiring-soon" ? "default" : "default"}
      className={
        status === "expired"
          ? "border-red-200 bg-red-50"
          : status === "expiring-soon"
            ? "border-yellow-200 bg-yellow-50"
            : "border-green-200 bg-green-50"
      }
    >
      {status === "expired" ? (
        <AlertCircle className="h-4 w-4 text-red-600" />
      ) : status === "expiring-soon" ? (
        <Clock className="h-4 w-4 text-yellow-600" />
      ) : (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      )}
      <div className="flex-1">
        <AlertTitle
          className={
            status === "expired" ? "text-red-800" : status === "expiring-soon" ? "text-yellow-800" : "text-green-800"
          }
        >
          {status === "expired"
            ? "Your subscription has expired"
            : status === "expiring-soon"
              ? `Your subscription expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`
              : "Your subscription is active"}
        </AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span
            className={
              status === "expired" ? "text-red-700" : status === "expiring-soon" ? "text-yellow-700" : "text-green-700"
            }
          >
            {status === "expired"
              ? "Please renew your subscription to continue using Q-Drive."
              : status === "expiring-soon"
                ? "Renew now to avoid interruption in service."
                : "Your account is in good standing."}
          </span>
          {(status === "expired" || status === "expiring-soon") && (
            <Button
              size="sm"
              variant={status === "expired" ? "destructive" : "outline"}
              className="ml-2"
              onClick={handleRenew}
            >
              Renew Now
            </Button>
          )}
        </AlertDescription>
      </div>
    </Alert>
  )
}
