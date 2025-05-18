"use client"

import { motion } from "framer-motion"
import { Bike } from "lucide-react"

export function FallbackAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 1.5 }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full opacity-20"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 2], opacity: [0.2, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        />
        <Bike className="h-24 w-24 text-green-500" />
      </motion.div>
    </div>
  )
}
