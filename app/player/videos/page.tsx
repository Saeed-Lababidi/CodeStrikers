"use client"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, ArrowUpRight, Play, Calendar, Clock } from "lucide-react"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlayerVideosPage() {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
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
                <DropdownMenuItem asChild>
                  <Link href="/player/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
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
          <PageHeader title="My Videos" description="View and manage your uploaded footage">
            <Link href="/player/upload">
              <Button>Upload New Footage</Button>
            </Link>
          </PageHeader>

          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList>
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="analyzed">Analyzed</TabsTrigger>
              <TabsTrigger value="pending">Pending Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gray-100 relative group">
                        <img
                          src={`/placeholder.svg?height=200&width=400&text=Training+${i}`}
                          alt={`Training ${i} thumbnail`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="ghost" size="icon" className="rounded-full bg-white text-black">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          2:45
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {i % 3 === 0 ? "Analyzed" : i % 3 === 1 ? "Processing" : "Pending"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Training Session {i}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>April {i + 1}, 2025</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>2:45</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Uploaded 2 weeks ago</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analyzed" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gray-100 relative group">
                        <img
                          src={`/placeholder.svg?height=200&width=400&text=Training+${i}`}
                          alt={`Training ${i} thumbnail`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="ghost" size="icon" className="rounded-full bg-white text-black">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          2:45
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Analyzed</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Training Session {i}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>April {i + 1}, 2025</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>2:45</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Uploaded 2 weeks ago</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[2, 3, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gray-100 relative group">
                        <img
                          src={`/placeholder.svg?height=200&width=400&text=Training+${i}`}
                          alt={`Training ${i} thumbnail`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="ghost" size="icon" className="rounded-full bg-white text-black">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          2:45
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                            {i % 3 === 1 ? "Processing" : "Pending"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Training Session {i}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>April {i + 1}, 2025</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>2:45</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Uploaded 2 weeks ago</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </main>

      <footer className="border-t py-6 mt-auto">
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
