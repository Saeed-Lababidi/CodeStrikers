import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Upload, Video } from "lucide-react"
import { Container } from "@/components/layout/container"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-green-600" />
            <span>CodeStrikers' Scouting AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link href="/upload" className="font-medium">
              Upload
            </Link>
            <Link href="/players" className="font-medium">
              Players
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </Container>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-green-50 to-white">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Football Talent Scouting
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Discover the next generation of football stars with our advanced computer vision and AI analytics
                    platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/upload">
                    <Button size="lg" className="gap-1.5">
                      Upload Footage <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=750"
                alt="Football player analysis visualization"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={550}
                height={310}
              />
            </div>
          </Container>
        </section>
        <section className="py-12 md:py-24 bg-white">
          <Container>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform uses advanced computer vision to analyze player movements, skills, and performance
                  metrics.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-12 pt-12">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <Upload className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Upload Footage</h3>
                <p className="text-sm text-gray-500 text-center">
                  Upload match or training videos to our secure platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <Video className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-sm text-gray-500 text-center">
                  Our AI analyzes player movements, positioning, and technical skills.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <BarChart2 className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Get Insights</h3>
                <p className="text-sm text-gray-500 text-center">
                  Receive detailed reports and metrics on player performance and potential.
                </p>
              </div>
            </div>
          </Container>
        </section>
        <section className="py-12 md:py-24 bg-gray-50">
          <Container>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools for football talent scouting.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pt-12">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold">Player Tracking</h3>
                <p className="text-gray-500">Track player movements, positioning, and spatial awareness.</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold">Skill Analysis</h3>
                <p className="text-gray-500">Analyze technical skills like passing, shooting, and dribbling.</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold">Physical Metrics</h3>
                <p className="text-gray-500">Measure speed, acceleration, stamina, and physical attributes.</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold">Tactical Understanding</h3>
                <p className="text-gray-500">Evaluate decision-making and tactical awareness during matches.</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold">Comparison Tools</h3>
                <p className="text-gray-500">Compare players against benchmarks or professional standards.</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold">Scouting Reports</h3>
                <p className="text-gray-500">Generate comprehensive scouting reports with AI-powered insights.</p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <Container className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 ScoutVision AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  )
}

