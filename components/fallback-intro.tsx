"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bike } from "lucide-react"

export function FallbackIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"initial" | "logo" | "complete">("initial")

  useEffect(() => {
    // Show logo after a short delay
    const timer1 = setTimeout(() => {
      setStage("logo")

      // Complete after 2 seconds
      const timer2 = setTimeout(() => {
        setStage("complete")
        onComplete()
      }, 2000)

      return () => clearTimeout(timer2)
    }, 1000)

    return () => clearTimeout(timer1)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-green-500 flex items-center justify-center">
      {stage === "initial" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-xl">
          <div className="animate-pulse">Loading Q-Drive...</div>
        </motion.div>
      )}

      {stage === "logo" && (
        <motion.div
          className="flex items-center text-5xl font-bold"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
