"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Video, ArrowLeft, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { signUpClub } from "@/lib/auth/actions"
import { z } from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { isSupabaseConfigured } from "@/lib/supabase/client"

// Validation schema
const clubSignupSchema = z
  .object({
    clubName: z.string().min(2, "Club name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormErrors = {
  clubName?: string[]
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
  form?: string
}

export default function ClubSignupPage() {
  const [clubName, setClubName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [configError, setConfigError] = useState<boolean>(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setConfigError(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setGeneralError(null)
    setSignupSuccess(false)

    try {
      // Client-side validation
      clubSignupSchema.parse({
        clubName,
        email,
        password,
        confirmPassword,
      })

      setIsLoading(true)

      // Create form data for server action
      const formData = new FormData()
      formData.append("clubName", clubName)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("confirmPassword", confirmPassword)

      // Call server action
      const result = await signUpClub(formData)

      setIsLoading(false)

      if (result.success) {
        setSignupSuccess(true)
        setSuccessMessage(result.message || "Account created successfully!")

        // Clear the form
        setClubName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        toast({
          title: "Account Created",
          description: "Your account has been created successfully.",
        })
      } else {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors)
        } else {
          setGeneralError(result.error || "Something went wrong")

          // If there's a database error, show a toast recommending the demo account
          if (result.error?.includes("Database") || result.error?.includes("profile")) {
            toast({
              title: "Database Setup Issue",
              description: "We recommend using the demo account for this preview.",
              variant: "destructive",
            })
          }
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
        setGeneralError("Something went wrong. Please try again.")
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
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Club Account</CardTitle>
                <CardDescription>Sign up for a club account to start scouting and analyzing talent.</CardDescription>
              </CardHeader>
              <CardContent>
                {configError && (
                  <Alert className="mb-4 bg-amber-50 text-amber-800 border-amber-200">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Supabase configuration is missing. Please check your environment variables.
                    </AlertDescription>
                  </Alert>
                )}

                {generalError && (
                  <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{generalError}</AlertDescription>
                  </Alert>
                )}

                {signupSuccess && (
                  <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      {successMessage}
                      <div className="mt-2">
                        <Link href="/auth/club/login">
                          <Button variant="outline" size="sm" className="text-green-700 border-green-700">
                            Go to Login
                          </Button>
                        </Link>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <Alert className="mb-6 bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    <strong className="font-medium">Recommended:</strong> For the best experience in this preview,
                    please use our demo account instead of creating a new one.
                  </AlertDescription>
                </Alert>

                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <h3 className="text-sm font-medium text-green-800 mb-1">Demo Account</h3>
                  <p className="text-xs text-green-700 mb-2">
                    Use these credentials to access all features immediately:
                  </p>
                  <div className="text-xs text-green-700">
                    <div>
                      <strong>Email:</strong> demo@scoutvision.ai
                    </div>
                    <div>
                      <strong>Password:</strong> Demo123456!
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link href="/auth/club/login">
                      <Button className="w-full text-sm">Go to Login with Demo Account</Button>
                    </Link>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clubName">Club Name</Label>
                    <Input
                      id="clubName"
                      placeholder="Enter your club name"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      className={errors.clubName ? "border-red-500" : ""}
                    />
                    {errors.clubName && <p className="text-sm text-red-500">{errors.clubName[0]}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password[0]}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword[0]}</p>}
                  </div>

                  {errors.form && (
                    <div className="bg-red-50 p-3 rounded-md">
                      <p className="text-sm text-red-500">{errors.form}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading} variant="outline">
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/auth/club/login" className="text-green-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
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
