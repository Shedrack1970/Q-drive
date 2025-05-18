import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
      <p className="mt-4 text-green-800 font-medium">Loading...</p>
    </div>
  )
}
