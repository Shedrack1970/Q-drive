"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Bike } from "lucide-react"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [animationStage, setAnimationStage] = useState<"initial" | "logo" | "complete">("initial")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up function to handle any ongoing processes
  const cleanUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  useEffect(() => {
    // Start with initial animation
    setAnimationStage("initial")

    // After 3 seconds, show the logo animation
    timerRef.current = setTimeout(() => {
      setAnimationStage("logo")

      // Complete the animation after 2 more seconds
      timerRef.current = setTimeout(() => {
        setAnimationStage("complete")
        onComplete()
      }, 2000)
    }, 3000)

    // Clean up on unmount
    return cleanUp
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-green-500 flex items-center justify-center">
      {animationStage === "initial" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl flex items-center"
        >
          <Bike className="h-16 w-16 mr-3 animate-bounce" />
          <span className="font-bold">Loading...</span>
        </motion.div>
      )}

      {animationStage === "logo" && (
        <motion.div
          className="flex items-center text-5xl font-bold"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <Bike className="h-16 w-16 text-white mr-2" />
          <span className="text-white">
            Q-<span className="text-white">Drive</span>
          </span>
        </motion.div>
      )}
    </div>
  )
}
