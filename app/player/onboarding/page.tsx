"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { completePlayerProfile } from "@/lib/auth/actions"
import { z } from "zod"

// Validation schema
const playerProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  position: z.string().min(1, "Position is required"),
  preferredFoot: z.string().min(1, "Preferred foot is required"),
  height: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Height must be a number",
    }),
  weight: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Weight must be a number",
    }),
  bio: z.string().optional(),
})

type FormErrors = {
  fullName?: string[]
  dateOfBirth?: string[]
  position?: string[]
  preferredFoot?: string[]
  height?: string[]
  weight?: string[]
  bio?: string[]
  form?: string
}

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
  const [errors, setErrors] = useState<FormErrors>({})
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setErrors({})

    try {
      // Validate first step fields
      const { fullName, dateOfBirth, position, preferredFoot } = formData
      z.object({
        fullName: playerProfileSchema.shape.fullName,
        dateOfBirth: playerProfileSchema.shape.dateOfBirth,
        position: playerProfileSchema.shape.position,
        preferredFoot: playerProfileSchema.shape.preferredFoot,
      }).parse({ fullName, dateOfBirth, position, preferredFoot })

      setStep((prev) => prev + 1)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {}
        error.errors.forEach((err) => {
          if (err.path) {
            const field = err.path[0] as keyof FormErrors
            if (!fieldErrors[field]) {
              fieldErrors[field] = []
            }
            fieldErrors[field]?.push(err.message)
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      // Validate all fields
      playerProfileSchema.parse(formData)

      setIsLoading(true)

      // Create form data for server action
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      // Call server action
      const result = await completePlayerProfile(formDataObj)

      if (!result.success) {
        setIsLoading(false)
        if (result.fieldErrors) {
          setErrors(result.fieldErrors)
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      setIsLoading(false)
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {}
        error.errors.forEach((err) => {
          if (err.path) {
            const field = err.path[0] as keyof FormErrors
            if (!fieldErrors[field]) {
              fieldErrors[field] = []
            }
            fieldErrors[field]?.push(err.message)
          }
        })
        setErrors(fieldErrors)
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-green-600" />
            <span>ScoutVision AI</span>
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
                          className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName[0]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className={errors.dateOfBirth ? "border-red-500" : ""}
                        />
                        {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth[0]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Position *</Label>
                        <Select
                          value={formData.position}
                          onValueChange={(value) => handleSelectChange("position", value)}
                        >
                          <SelectTrigger className={errors.position ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select your position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                            <SelectItem value="defender">Defender</SelectItem>
                            <SelectItem value="midfielder">Midfielder</SelectItem>
                            <SelectItem value="forward">Forward</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.position && <p className="text-sm text-red-500">{errors.position[0]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Foot *</Label>
                        <RadioGroup
                          value={formData.preferredFoot}
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
                        {errors.preferredFoot && <p className="text-sm text-red-500">{errors.preferredFoot[0]}</p>}
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
                          className={errors.height ? "border-red-500" : ""}
                        />
                        {errors.height && <p className="text-sm text-red-500">{errors.height[0]}</p>}
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
                          className={errors.weight ? "border-red-500" : ""}
                        />
                        {errors.weight && <p className="text-sm text-red-500">{errors.weight[0]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          placeholder="Tell us a bit about yourself as a player"
                          value={formData.bio}
                          onChange={handleChange}
                          className={`w-full min-h-[100px] p-2 border rounded-md ${errors.bio ? "border-red-500" : ""}`}
                        />
                        {errors.bio && <p className="text-sm text-red-500">{errors.bio[0]}</p>}
                      </div>

                      {errors.form && (
                        <div className="bg-red-50 p-3 rounded-md">
                          <p className="text-sm text-red-500">{errors.form}</p>
                        </div>
                      )}

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
          <p className="text-center text-sm text-gray-500">© 2025 ScoutVision AI. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  )
}
