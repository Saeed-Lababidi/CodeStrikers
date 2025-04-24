"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Activity, Video, Clock, ArrowUpRight, Award, TrendingUp, User, LogOut } from "lucide-react"
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

export default function PlayerDashboardPage() {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <div className="px-2 py-1.5 text-sm font-medium">Player Account</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/player/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
              <span>CodeStrikers</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/player/dashboard" className="font-medium text-green-600">
              Dashboard
            </Link>
            <Link href="/player/performance" className="font-medium">
              Performance
            </Link>
            <Link href="/player/videos" className="font-medium">
              My Videos
            </Link>
            <Link href="/player/profile" className="font-medium">
              Profile
            </Link>
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-6 sm:py-10">
          <PageHeader title="Player Dashboard" description="Track your performance and development">
            <Link href="/player/upload">
              <Button>Upload New Footage</Button>
            </Link>
          </PageHeader>

          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                <Award className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82/100</div>
                <p className="text-xs text-gray-500">+3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Videos Analyzed</CardTitle>
                <Video className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">+2 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5</div>
                <p className="text-xs text-gray-500">+3.2 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Improvement</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+8%</div>
                <p className="text-xs text-gray-500">Since last assessment</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="recent">Recent Analysis</TabsTrigger>
              <TabsTrigger value="feedback">Coach Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Your performance across key metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Technical Skills</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Physical Attributes</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Tactical Awareness</span>
                          <span className="text-sm font-medium">72%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Decision Making</span>
                          <span className="text-sm font-medium">68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Team Play</span>
                          <span className="text-sm font-medium">81%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "81%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Development Trend</CardTitle>
                    <CardDescription>Your progress over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                      <Activity className="h-16 w-16 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gray-100 relative">
                        <img
                          src={`/placeholder.svg?height=200&width=400&text=Training+${i}`}
                          alt={`Training ${i} thumbnail`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          2:45
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Training Session {i}</h3>
                        <p className="text-sm text-gray-500 mb-2">Analyzed on April {i + 1}, 2025</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Complete</span>
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

            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Coach Feedback</CardTitle>
                  <CardDescription>Recent feedback from your coaches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                          JD
                        </div>
                        <div>
                          <p className="font-medium">Coach John Doe</p>
                          <p className="text-xs text-gray-500">April 10, 2025</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Great improvement in your passing accuracy. You've increased from 72% to 85% in the last month.
                        Continue working on your first touch control in high-pressure situations.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                          MS
                        </div>
                        <div>
                          <p className="font-medium">Coach Mary Smith</p>
                          <p className="text-xs text-gray-500">April 5, 2025</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Your positioning during defensive phases has improved significantly. I'd like to see you take
                        more initiative in organizing the defensive line. Let's work on your communication skills next
                        session.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                          JD
                        </div>
                        <div>
                          <p className="font-medium">Coach John Doe</p>
                          <p className="text-xs text-gray-500">March 28, 2025</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Your physical metrics are excellent. You've shown great stamina throughout the full 90 minutes.
                        Focus on maintaining this level while improving your decision-making in the final third.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
