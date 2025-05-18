"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign, TrendingUp, Users, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DriverEarnings() {
  const [period, setPeriod] = useState("week")
  const [subscriptionStatus, setSubscriptionStatus] = useState<"active" | "expiring-soon" | "expired">("active")
  const [expiryDate, setExpiryDate] = useState("June 14, 2025")
  const [daysLeft, setDaysLeft] = useState(30)

  const handleRenewSubscription = () => {
    // In a real app, this would navigate to a payment page
    window.location.href = "/driver/subscription"
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your monthly driver subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      subscriptionStatus === "active"
                        ? "default"
                        : subscriptionStatus === "expiring-soon"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {subscriptionStatus === "active" && "Active"}
                    {subscriptionStatus === "expiring-soon" && "Expiring Soon"}
                    {subscriptionStatus === "expired" && "Expired"}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Expiry Date</p>
                <p className="text-sm mt-1">{expiryDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Days Left</p>
                <p className="text-sm mt-1">{daysLeft} days</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm font-medium">Monthly Fee</p>
                <p className="text-2xl font-bold">$5.00</p>
              </div>
              <Button onClick={handleRenewSubscription}>
                {subscriptionStatus === "expired" ? "Renew Now" : "Extend Subscription"}
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">Payment Details</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Card Payment</span>
                  </div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Bank Transfer</span>
                  </div>
                  <span className="text-sm">Available</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Earnings Overview</CardTitle>
            <Tabs defaultValue="week" className="w-[200px]" onValueChange={setPeriod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardDescription>
            Your earnings for the {period === "day" ? "day" : period === "week" ? "past week" : "past month"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {period === "day" ? "₦3,250" : period === "week" ? "₦18,420" : "₦72,840"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {period === "day" ? "+12%" : period === "week" ? "+8%" : "+15%"} from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{period === "day" ? "8" : period === "week" ? "42" : "168"}</div>
                <p className="text-xs text-muted-foreground">
                  {period === "day" ? "+2" : period === "week" ? "+5" : "+22"} from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Online</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{period === "day" ? "6.5" : period === "week" ? "38" : "152"}</div>
                <p className="text-xs text-muted-foreground">
                  {period === "day" ? "+0.5" : period === "week" ? "+3" : "+12"} from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">+0.2 from last period</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 h-[200px] w-full rounded-md border p-4">
            <div className="h-full w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
              <p className="text-sm text-gray-500">Earnings chart will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent earnings from completed rides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Ride #{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-sm text-gray-500">{new Date(Date.now() - i * 86400000).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{Math.floor(Math.random() * 3000) + 1000}</p>
                  <Badge variant="outline" className="text-xs">
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
