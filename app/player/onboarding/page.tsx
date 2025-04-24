"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PlayerOnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    position: "",
    preferredFoot: "right",
    height: "",
    weight: "",
    bio: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.dateOfBirth || !formData.position) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
    }

    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/player/dashboard")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>
        </Container>
      </header>

      <main className="flex-1 flex items-center justify-center py-10">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Link href="/auth/player" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
              <div className="text-sm text-gray-500">Step {step} of 2</div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
                <CardDescription>
                  {step === 1 ? "Let's start with your basic information" : "Almost done! Just a few more details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {step === 1 ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Position *</Label>
                        <Select
                          value={formData.position}
                          onValueChange={(value) => handleSelectChange("position", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                            <SelectItem value="defender">Defender</SelectItem>
                            <SelectItem value="midfielder">Midfielder</SelectItem>
                            <SelectItem value="forward">Forward</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Foot</Label>
                        <RadioGroup
                          defaultValue={formData.preferredFoot}
                          onValueChange={(value) => handleSelectChange("preferredFoot", value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="right" id="right" />
                            <Label htmlFor="right">Right</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="left" id="left" />
                            <Label htmlFor="left">Left</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both" />
                            <Label htmlFor="both">Both</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="button" className="w-full" onClick={handleNext}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          placeholder="Enter your height in cm"
                          value={formData.height}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          placeholder="Enter your weight in kg"
                          value={formData.weight}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          placeholder="Tell us a bit about yourself as a player"
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full min-h-[100px] p-2 border rounded-md"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={handleBack}>
                          Back
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isLoading}>
                          {isLoading ? "Saving..." : "Complete Profile"}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </main>

      <footer className="border-t py-6">
        <Container className="flex justify-center">
          <p className="text-center text-sm text-gray-500">© 2025 CodeStrikers. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  )
}
