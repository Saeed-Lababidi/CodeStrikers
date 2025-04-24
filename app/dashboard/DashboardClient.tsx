"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Activity,
  Users,
  Video,
  Clock,
  ArrowUpRight,
  LogOut,
  Code,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardClient({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    // Client-side sign out (removes session from browser)
    await supabase.auth.signOut();

    // Also call server-side route to destroy cookie
    await fetch("/auth/club/logout", {
      method: "POST",
    });

    router.push("/auth/club/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="font-medium text-green-600">
              Dashboard
            </Link>
            <Link href="/players" className="font-medium">
              Players
            </Link>
            <Link href="/leaderboard" className="font-medium">
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <form action={handleLogout}>
              <Button type="submit" variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </form>
          </div>
        </Container>
      </header>

      <Container className="py-6 sm:py-10">
        <PageHeader
          title="Dashboard"
          description="View your scouting analytics and recent activities"
        >
          <div className="flex flex-wrap gap-2">
            <Link href="/upload">
              <Button>Upload New Footage</Button>
            </Link>
            <Link href="/video-analysis">
              <Button variant="outline" className="gap-2">
                <Code className="h-4 w-4" />
                Python Analysis
              </Button>
            </Link>
          </div>
        </PageHeader>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Players
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Videos Analyzed
              </CardTitle>
              <Video className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+2 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Analysis Hours
              </CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5</div>
              <p className="text-xs text-gray-500">+3.2 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Reports Generated
              </CardTitle>
              <BarChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500">+1 this week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="recent">Recent Analysis</TabsTrigger>
            <TabsTrigger value="players">Top Players</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={`/placeholder.svg?height=200&width=400&text=Match+${i}`}
                        alt={`Match ${i} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        3:24
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">
                        Training Session {i}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Analyzed on April {i + 1}, 2025
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {i % 2 === 0 ? "Complete" : "Processing"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="players">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Player {i}</h3>
                        <p className="text-sm text-gray-500">
                          Position:{" "}
                          {i % 3 === 0
                            ? "Forward"
                            : i % 3 === 1
                            ? "Midfielder"
                            : "Defender"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Technical Skills</span>
                        <span className="font-medium">{70 + i * 3}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${70 + i * 3}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span>Physical Attributes</span>
                        <span className="font-medium">{65 + i * 4}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${65 + i * 4}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span>Tactical Awareness</span>
                        <span className="font-medium">{60 + i * 5}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${60 + i * 5}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Average metrics across all analyzed players
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                    <Activity className="h-16 w-16 text-gray-300" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of player skills by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                    <BarChart className="h-16 w-16 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Container>

      <footer className="border-t py-6 mt-auto">
        <Container className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 CodeStrikers. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:underline"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:underline"
            >
              Privacy
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
