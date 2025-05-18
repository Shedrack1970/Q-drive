"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

interface FaceVerificationProps {
  onVerificationComplete: (success: boolean) => void
}

export function FaceVerification({ onVerificationComplete }: FaceVerificationProps) {
  const { toast } = useToast()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "capturing" | "verifying" | "success" | "failed"
  >("idle")
  const [progress, setProgress] = useState(0)

  // Request camera access and start video stream
  const startCamera = async () => {
    try {
      setIsCapturing(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setVerificationStatus("capturing")
      toast({
        title: "Camera activated",
        description: "Please position your face in the frame and stay still.",
      })
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to verify your identity.",
        variant: "destructive",
      })
      setIsCapturing(false)
    }
  }

  // Capture image from video stream
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/png")
        setCapturedImage(imageDataUrl)

        // Stop video stream
        const stream = video.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
        video.srcObject = null

        // Start verification process
        verifyFace(imageDataUrl)
      }
    }
  }

  // Simulate face verification process
  const verifyFace = (imageData: string) => {
    setVerificationStatus("verifying")

    // Simulate progress updates
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)

        // Simulate verification result (success in most cases, random failure)
        const isSuccess = Math.random() > 0.2 // 80% success rate for demo

        setTimeout(() => {
          setVerificationStatus(isSuccess ? "success" : "failed")

          toast({
            title: isSuccess ? "Verification successful" : "Verification failed",
            description: isSuccess
              ? "Your identity has been verified successfully."
              : "We couldn't verify your identity. Please try again.",
            variant: isSuccess ? "default" : "destructive",
          })

          if (isSuccess) {
            onVerificationComplete(true)
          }
        }, 500)
      }
    }, 100)
  }

  // Retry verification
  const retryVerification = () => {
    setCapturedImage(null)
    setVerificationStatus("idle")
    setProgress(0)
    setIsCapturing(false)
  }

  // Auto-capture after a delay when camera is active
  useEffect(() => {
    let captureTimeout: NodeJS.Timeout

    if (verificationStatus === "capturing") {
      captureTimeout = setTimeout(() => {
        captureImage()
      }, 3000) // Auto-capture after 3 seconds
    }

    return () => {
      if (captureTimeout) clearTimeout(captureTimeout)
    }
  }, [verificationStatus])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Video feed */}
          {!capturedImage && (
            <div className="relative bg-black aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isCapturing ? "block" : "hidden"}`}
              />

              {!isCapturing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <Camera size={48} className="mb-2" />
                  <p className="text-center text-sm">Face verification is required for driver registration.</p>
                </div>
              )}

              {verificationStatus === "capturing" && (
                <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-md m-8 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-green-400 rounded-full"></div>
                </div>
              )}
            </div>
          )}

          {/* Captured image */}
          {capturedImage && (
            <div className="relative bg-black aspect-video flex items-center justify-center">
              <img
                src={capturedImage || "/placeholder.svg"}
                alt="Captured face"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Canvas for processing (hidden) */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Verification status overlay */}
          {verificationStatus === "verifying" && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-6">
              <div className="w-full max-w-xs">
                <p className="text-center mb-2">Verifying your identity...</p>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-xs text-center text-gray-400">Please wait while we verify your face</p>
              </div>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="absolute inset-0 bg-green-900/70 flex flex-col items-center justify-center text-white p-6">
              <CheckCircle size={48} className="text-green-400 mb-2" />
              <p className="text-center font-medium">Verification Successful</p>
              <p className="text-sm text-center mt-1 text-green-200">Your identity has been verified</p>
            </div>
          )}

          {verificationStatus === "failed" && (
            <div className="absolute inset-0 bg-red-900/70 flex flex-col items-center justify-center text-white p-6">
              <AlertCircle size={48} className="text-red-400 mb-2" />
              <p className="text-center font-medium">Verification Failed</p>
              <p className="text-sm text-center mt-1 text-red-200">We couldn't verify your identity</p>
              <Button variant="outline" className="mt-4" onClick={retryVerification}>
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4">
          {verificationStatus === "idle" && (
            <Button onClick={startCamera} className="w-full">
              <Camera className="mr-2 h-4 w-4" /> Start Face Verification
            </Button>
          )}

          {verificationStatus === "capturing" && (
            <div className="text-center text-sm text-gray-500">
              <p>Capturing in progress... Please look at the camera and stay still.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
