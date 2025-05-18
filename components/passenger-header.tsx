"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, User, Menu, Palette, Bike, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

// Define available header colors
const headerColors = [
  { name: "Green", bg: "bg-green-600", text: "text-white" },
  { name: "Blue", bg: "bg-blue-600", text: "text-white" },
  { name: "Purple", bg: "bg-purple-600", text: "text-white" },
  { name: "Red", bg: "bg-red-600", text: "text-white" },
  { name: "Orange", bg: "bg-orange-600", text: "text-white" },
  { name: "Teal", bg: "bg-teal-600", text: "text-white" },
  { name: "Dark", bg: "bg-gray-800", text: "text-white" },
]

export function PassengerHeader() {
  const { toast } = useToast()
  const [headerColor, setHeaderColor] = useState(headerColors[0])

  const handleColorChange = (color: (typeof headerColors)[0]) => {
    setHeaderColor(color)
    toast({
      title: "Theme updated",
      description: `Header color changed to ${color.name}`,
    })
  }

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications.",
    })
  }

  return (
    <header className={`${headerColor.bg} ${headerColor.text} shadow-md py-4 transition-colors duration-300 border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bike className="h-6 w-6 text-green-500 mr-2" />
            <Link href="/passenger/dashboard" className="font-bold text-xl">
              Q-Drive
            </Link>
            <Truck className="h-5 w-5 text-green-500 ml-1" />
          </div>

          <div className="flex items-center gap-2">
            <button className="relative mr-2" onClick={handleNotificationClick}>
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-current">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Header Color</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {headerColors.map((color) => (
                  <DropdownMenuItem
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded-full ${color.bg}`}></div>
                    <span>{color.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-current">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/passenger/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/passenger/history" className="w-full">
                    Ride History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/passenger/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/login" className="w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="md:hidden text-current">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
