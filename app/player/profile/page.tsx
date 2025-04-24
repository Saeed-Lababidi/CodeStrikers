"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, Calendar, MapPin, Award } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"

export default function PlayerProfilePage() {
  const handleLogout = async () => {
    await signOut()
  }

  // Mock player data
  const player = {
    name: "John Smith",
    position: "Midfielder",
    dateOfBirth: "2005-06-15",
    age: 19,
    height: "178",
    weight: "72",
    preferredFoot: "Right",
    club: "FC Barcelona Academy",
    bio: "Dedicated midfielder with strong technical skills and excellent vision. Looking to develop my game and reach the professional level.",
    achievements: [
      "Regional Youth Championship Winner 2023",
      "Academy Player of the Year 2022",
      "Selected for National Youth Camp 2021",
    ],
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
          <PageHeader title="My Profile" description="View and manage your player information">
            <Link href="/player/profile/edit">
              <Button>Edit Profile</Button>
            </Link>
          </PageHeader>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-bold">{player.name}</h2>
                  <p className="text-gray-500">{player.position}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{player.club}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(player.dateOfBirth).toLocaleDateString()} ({player.age} years)
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Height</h3>
                    <p>{player.height} cm</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                    <p>{player.weight} kg</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Preferred Foot</h3>
                    <p>{player.preferredFoot}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{player.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {player.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Technical Rating</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Physical Rating</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Tactical Rating</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Overall Rating</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
