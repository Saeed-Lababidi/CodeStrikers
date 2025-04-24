"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function HomePage() {
  const [activeButton, setActiveButton] = useState<"club" | "player" | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="font-medium">
              Features
            </Link>
            <Link href="/pricing" className="font-medium">
              Pricing
            </Link>
            <Link href="/about" className="font-medium">
              About Us
            </Link>
          </nav>
        </Container>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <Container className="py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Football Talent Scouting <span className="text-green-600">Reimagined</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Advanced AI-powered analysis for players and clubs. Discover talent and improve performance with
              data-driven insights.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
              <div className="w-full md:w-64">
                <Button
                  variant={activeButton === "club" ? "default" : "outline"}
                  className={`w-full text-lg py-6 ${activeButton === "club" ? "bg-green-600 hover:bg-green-700" : ""}`}
                  onClick={() => setActiveButton(activeButton === "club" ? null : "club")}
                >
                  I'm a Club
                </Button>

                <AnimatePresence>
                  {activeButton === "club" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border border-t-0 rounded-b-lg p-4 shadow-sm space-y-3">
                        <p className="text-sm text-gray-600 mb-2">
                          Scout new talent, analyze player performance, and make data-driven recruitment decisions.
                        </p>
                        <Link href="/auth/club/login">
                          <Button className="w-full" size="sm">
                            Login
                          </Button>
                        </Link>
                        <Link href="/auth/club/signup">
                          <Button variant="outline" className="w-full" size="sm">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full md:w-64">
                <Button
                  variant={activeButton === "player" ? "default" : "outline"}
                  className={`w-full text-lg py-6 ${
                    activeButton === "player" ? "bg-green-600 hover:bg-green-700" : ""
                  }`}
                  onClick={() => setActiveButton(activeButton === "player" ? null : "player")}
                >
                  I'm a Player
                </Button>

                <AnimatePresence>
                  {activeButton === "player" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border border-t-0 rounded-b-lg p-4 shadow-sm space-y-3">
                        <p className="text-sm text-gray-600 mb-2">
                          Track your performance, showcase your skills, and get discovered by top clubs.
                        </p>
                        <Link href="/auth/club/signup">
                          <Button className="w-full" size="sm">
                            Login
                          </Button>
                        </Link>
                        <Link href="/auth/player">
                          <Button  variant="outline" className="w-full" size="sm">
                            Sign up with Club Code
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-20">
              <Link href="/features">
                <Button variant="link" className="text-green-600 text-lg group">
                  Explore our features
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t py-6 md:py-8">
        <Container className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 CodeStrikers. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-gray-500 hover:underline">
              About
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  )
}
