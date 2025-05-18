"use client"

import { Button } from "@/components/ui/button"

export function ResetIntro() {
  const handleReset = () => {
    localStorage.removeItem("hasSeenIntro")
    window.location.reload()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReset}
      className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100"
    >
      Reset Intro
    </Button>
  )
}
