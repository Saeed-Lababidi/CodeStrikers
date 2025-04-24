"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { verifyPlayerCode } from "@/lib/auth/actions" // Fixed import path

export default function PlayerAuthPage() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter your player code",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("code", code)

      const result = await verifyPlayerCode(formData)

      if (result.success) {
        // The redirect will happen in the server action
        // This code won't execute if redirect is successful
      } else {
        toast({
          title: "Error",
          description: result.error || "Invalid player code",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      setIsLoading(false)
    }
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
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Player Access</CardTitle>
                <CardDescription>
                  Enter the code provided by your club or coach to access your player account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="code"
                      placeholder="Enter your player code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="text-center text-lg tracking-wider"
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Example: For demo, use code "NEW123" for new player or "PLAYER1" for existing player
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Continue"}
                  </Button>
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
