"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Video, ArrowLeft, Info, AlertTriangle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { signInUser } from "@/lib/auth/actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { isSupabaseConfigured } from "@/lib/supabase/client"

export default function ClubLoginPage() {
  const [email, setEmail] = useState("demo@scoutvision.ai")
  const [password, setPassword] = useState("Demo123456!")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [configError, setConfigError] = useState<boolean>(false)
  const [isSettingUpDemo, setIsSettingUpDemo] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setConfigError(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Always use demo credentials
      const demoEmail = "demo@scoutvision.ai"
      const demoPassword = "Demo123456!"

      // Create form data for server action
      const formData = new FormData()
      formData.append("email", demoEmail)
      formData.append("password", demoPassword)

      // Call server action
      const result = await signInUser(formData)

      if (!result.success) {
        setIsLoading(false)
        setError(result.error || "Login failed. Please try again.")
      }
      // If successful, the server action will redirect to dashboard
    } catch (error) {
      setIsLoading(false)
      setError("Something went wrong. Please try again.")
    }
  }

  const setupDemoAccount = async () => {
    setIsSettingUpDemo(true)
    setError(null)

    try {
      const response = await fetch("/api/setup-demo")
      const data = await response.json()

      if (data.success) {
        toast({
          title: "Demo Account Ready",
          description: "The demo account has been set up. You can now log in.",
        })
        setError(null)
      } else {
        setError("Failed to set up demo account: " + (data.error || "Unknown error"))
        toast({
          title: "Setup Failed",
          description: "Failed to set up demo account. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setError("Failed to set up demo account. Please try again.")
      toast({
        title: "Setup Error",
        description: "An error occurred while setting up the demo account.",
        variant: "destructive",
      })
    } finally {
      setIsSettingUpDemo(false)
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
                <CardTitle className="text-2xl">Club Login</CardTitle>
                <CardDescription>Sign in to your club account to access the scouting dashboard.</CardDescription>
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

                {error && (
                  <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {error}
                      {error.includes("Invalid login credentials") && (
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-700 border-red-300"
                            onClick={setupDemoAccount}
                            disabled={isSettingUpDemo}
                          >
                            {isSettingUpDemo ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Setting up demo account...
                              </>
                            ) : (
                              "Set Up Demo Account"
                            )}
                          </Button>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <Alert className="mb-6 bg-green-50 border-green-200">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    <strong className="font-medium">Demo Account:</strong> The credentials below are pre-filled and
                    ready to use. Just click "Sign In" to access all features.
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-green-300 bg-green-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/club/reset-password" className="text-xs text-gray-500 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-green-300 bg-green-50"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In with Demo Account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link href="/auth/club/signup" className="text-green-600 hover:underline">
                    Sign up
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
