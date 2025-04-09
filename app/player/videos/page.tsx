"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Card, CardContent } from "@/components/ui/card"
import { Video, User, Search, Filter, ChevronDown, ArrowUpDown, LogOut, Upload } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { Input } from "@/components/ui/input"
import { signOut } from "@/lib/auth/actions"
import { useAuth } from "@/lib/auth/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PlayerVideosPage() {
  const { user } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-green-600" />
            <span>ScoutVision AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/player/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link href="/player/performance" className="font-medium">
              Performance
            </Link>
            <Link href="/player/videos" className="font-medium text-green-600">
              My Videos
            </Link>
            <Link href="/player/profile" className="font-medium">
              Profile
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">Player Account</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/player/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-6 sm:py-10">
          <PageHeader title="My Videos" description="View and manage your uploaded videos">
            <Link href="/player/upload">
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload New Video
              </Button>
            </Link>
          </PageHeader>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input placeholder="Search videos..." className="pl-10" />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Videos</DropdownMenuItem>
                  <DropdownMenuItem>Match Footage</DropdownMenuItem>
                  <DropdownMenuItem>Training Sessions</DropdownMenuItem>
                  <DropdownMenuItem>Skills Showcase</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Newest First</DropdownMenuItem>
                  <DropdownMenuItem>Oldest First</DropdownMenuItem>
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                  <DropdownMenuItem>Most Viewed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Video+${i + 1}`}
                      alt={`Video ${i + 1} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {Math.floor(Math.random() * 5) + 1}:
                      {Math.floor(Math.random() * 60)
                        .toString()
                        .padStart(2, "0")}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">
                      {i % 3 === 0
                        ? `Match Highlights ${Math.floor(i / 3) + 1}`
                        : i % 3 === 1
                          ? `Training Session ${Math.floor(i / 3) + 1}`
                          : `Skills Showcase ${Math.floor(i / 3) + 1}`}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">Uploaded on April {i + 1}, 2025</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {i % 4 === 0 ? "Processing" : "Analyzed"}
                      </span>
                      <Link href={`/player/videos/${i + 1}`}>
                        <Button variant="outline" size="sm">
                          View Analysis
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </main>

      <footer className="border-t py-6 mt-auto">
        <Container className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 ScoutVision AI. All rights reserved.
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
