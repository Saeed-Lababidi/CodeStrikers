"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, User, Calendar, Ruler, Weight, Award, Edit, LogOut } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signOut } from "@/lib/auth/actions"
import { useAuth } from "@/lib/auth/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PlayerProfilePage() {
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
            <Link href="/player/videos" className="font-medium">
              My Videos
            </Link>
            <Link href="/player/profile" className="font-medium text-green-600">
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
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
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
          <PageHeader title="My Profile" description="View and manage your player profile" />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold">Alex Johnson</h2>
                    <p className="text-gray-500 mb-4">Forward</p>
                    <div className="flex items-center gap-1 mb-6">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Performance Score: 82/100</span>
                    </div>
                    <Link href="/player/settings">
                      <Button variant="outline" className="w-full">
                        Edit Profile
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">June 15, 2007</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Height</p>
                        <p className="font-medium">178 cm</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Weight className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium">68 kg</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Preferred Foot</p>
                        <p className="font-medium">Right</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Player Bio</CardTitle>
                      <CardDescription>Your football background and experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Passionate forward with 5 years of competitive experience. Known for speed, agility, and
                        finishing ability. Started playing at age 8 with local youth club before joining FC United's
                        academy program. Aspiring to develop technical skills and tactical awareness to reach the next
                        level.
                      </p>

                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Key Strengths</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>Acceleration and sprint speed</li>
                          <li>Finishing in one-on-one situations</li>
                          <li>Off-the-ball movement and positioning</li>
                          <li>Work rate and pressing from the front</li>
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Development Areas</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>Aerial duels and heading accuracy</li>
                          <li>Link-up play and hold-up play</li>
                          <li>Left foot finishing</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stats">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Statistics</CardTitle>
                      <CardDescription>Your performance metrics from analyzed footage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Technical Skills</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Shooting Accuracy</span>
                                <span className="text-sm font-medium">76%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: "76%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Passing Accuracy</span>
                                <span className="text-sm font-medium">82%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Dribbling Success</span>
                                <span className="text-sm font-medium">68%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Physical Attributes</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Sprint Speed</span>
                                <span className="text-sm font-medium">88%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Stamina</span>
                                <span className="text-sm font-medium">79%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "79%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Agility</span>
                                <span className="text-sm font-medium">85%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Tactical Awareness</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Positioning</span>
                                <span className="text-sm font-medium">81%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "81%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Decision Making</span>
                                <span className="text-sm font-medium">72%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Team Play</span>
                                <span className="text-sm font-medium">77%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "77%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="videos">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Videos</CardTitle>
                      <CardDescription>Videos you've uploaded for analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="border rounded-lg overflow-hidden">
                            <div className="aspect-video bg-gray-100 relative">
                              <img
                                src={`/placeholder.svg?height=200&width=400&text=Video+${i}`}
                                alt={`Video ${i} thumbnail`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                2:45
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium">Training Session {i}</h3>
                              <p className="text-xs text-gray-500">Uploaded on April {i + 1}, 2025</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Link href="/player/videos">
                          <Button variant="outline">View All Videos</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
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
