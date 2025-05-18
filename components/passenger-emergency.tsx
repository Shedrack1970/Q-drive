"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShieldAlert, Phone, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PassengerEmergency() {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [emergencyType, setEmergencyType] = useState<string>("unsafe")
  const [description, setDescription] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmergencySubmit = () => {
    setIsSubmitting(true)

    // Simulate emergency alert submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsOpen(false)

      toast({
        title: "Emergency alert sent",
        description: "Help is on the way. Stay calm and find a safe location if possible.",
        variant: "destructive",
      })

      // Reset form
      setDescription("")
      setEmergencyType("unsafe")
    }, 1500)
  }

  const handleShareLocation = () => {
    // In a real app, this would share the user's location
    navigator.clipboard.writeText("https://maps.app.goo.gl/?q=current_location")

    toast({
      title: "Location copied",
      description: "Your location link has been copied to clipboard. Share it with trusted contacts.",
    })
  }

  const handleCallEmergency = () => {
    // In a real app, this would initiate a call to emergency services
    window.location.href = "tel:911"
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="gap-1">
          <ShieldAlert className="h-4 w-4" />
          <span>Emergency</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Emergency Assistance
          </DialogTitle>
          <DialogDescription>Your safety is our priority. Report any issues during your ride.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <RadioGroup value={emergencyType} onValueChange={setEmergencyType} className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsafe" id="unsafe" />
              <Label htmlFor="unsafe" className="font-medium">
                I feel unsafe
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accident" id="accident" />
              <Label htmlFor="accident" className="font-medium">
                Accident occurred
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="driver" id="driver" />
              <Label htmlFor="driver" className="font-medium">
                Driver misconduct
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="font-medium">
                Other emergency
              </Label>
            </div>
          </RadioGroup>

          <div className="grid gap-2">
            <Label htmlFor="description">Describe the situation</Label>
            <Textarea
              id="description"
              placeholder="Please provide details about your emergency..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={handleShareLocation}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Location
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={handleCallEmergency}>
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={handleEmergencySubmit}
            disabled={isSubmitting || !description}
          >
            {isSubmitting ? "Sending Alert..." : "Send Emergency Alert"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
