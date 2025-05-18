"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface NegotiationChatProps {
  driverName: string
  driverInitial: string
  passengerName: string
  passengerInitial: string
  onComplete: () => void
  onCancel: () => void
  isDriver: boolean
}

interface Message {
  id: string
  sender: "driver" | "passenger"
  text: string
  timestamp: Date
}

export function NegotiationChat({
  driverName,
  driverInitial,
  passengerName,
  passengerInitial,
  onComplete,
  onCancel,
  isDriver,
}: NegotiationChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "passenger",
      text: isDriver
        ? "Hello, I need a ride. Are you available?"
        : "Hello, I need a ride to my destination. Are you available?",
      timestamp: new Date(),
    },
  ])
  const [isAgreed, setIsAgreed] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: isDriver ? "driver" : "passenger",
      text: message,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setMessage("")

    // Check if we've reached the 10 message limit
    if (updatedMessages.length >= 10 && !isAgreed) {
      setTimeout(() => {
        setMessages([
          ...updatedMessages,
          {
            id: Date.now().toString() + "1",
            sender: "system",
            text: "You've reached the maximum number of messages for negotiation. Please agree on terms or cancel.",
            timestamp: new Date(),
          },
        ])
      }, 500)
      return
    }

    // Simulate response
    if (updatedMessages.length < 10) {
      setTimeout(() => {
        const responseText = getResponseText(message, isDriver)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "2",
            sender: isDriver ? "passenger" : "driver",
            text: responseText,
            timestamp: new Date(),
          },
        ])
      }, 1000)
    }
  }

  const getResponseText = (msg: string, isDriverSending: boolean): string => {
    const lowerMsg = msg.toLowerCase()

    if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much")) {
      return isDriverSending
        ? "I can do it for ₦2,000. Does that work for you?"
        : "I can offer ₦1,800 for this ride. Is that acceptable?"
    }

    if (
      lowerMsg.includes("agree") ||
      lowerMsg.includes("deal") ||
      lowerMsg.includes("ok") ||
      lowerMsg.includes("yes")
    ) {
      setIsAgreed(true)
      return "Great! I agree to the terms. Let's proceed with the ride."
    }

    if (lowerMsg.includes("time") || lowerMsg.includes("when") || lowerMsg.includes("long")) {
      return "It should take about 30-35 minutes to reach the destination."
    }

    if (lowerMsg.includes("wait") || lowerMsg.includes("delay")) {
      return "I can wait for up to 5 minutes at the pickup location."
    }

    // Default responses
    const defaultResponses = [
      "I understand. Let's discuss the details.",
      "That sounds reasonable.",
      "I'm flexible with the arrangements.",
      "Let me know if you have any other questions.",
      "I'm ready when you are.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <Alert key={msg.id} variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>{msg.text}</AlertDescription>
              </Alert>
            )
          }

          const isCurrentUser = (isDriver && msg.sender === "driver") || (!isDriver && msg.sender === "passenger")
          return (
            <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-2 max-w-[80%]">
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{msg.sender === "driver" ? driverInitial : passengerInitial}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-3 ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{msg.sender === "driver" ? driverInitial : passengerInitial}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={messages.length >= 10 && !isAgreed}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={messages.length >= 10 && !isAgreed}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onComplete} disabled={!isAgreed}>
            Complete Negotiation
          </Button>
        </div>
      </div>
    </div>
  )
}
