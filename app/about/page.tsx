import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Users, Award, BarChart2, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.png" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/about" className="font-medium text-green-600">
              About Us
            </Link>
            <Link href="/features" className="font-medium">
              Features
            </Link>
            <Link href="/pricing" className="font-medium">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/club/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/auth/club/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-green-50 to-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">About ScoutVision AI</h1>
              <p className="text-xl text-gray-600 mb-8">
                Revolutionizing football talent scouting with advanced AI and computer vision technology.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  At ScoutVision AI, we're on a mission to democratize access to advanced sports analytics. We believe
                  that every player deserves the opportunity to be discovered and every club should have access to
                  cutting-edge scouting tools, regardless of their size or resources.
                </p>
                <p className="text-lg text-gray-600">
                  Our AI-powered platform bridges the gap between raw talent and opportunity, providing objective,
                  data-driven insights that help players develop and clubs make informed decisions.
                </p>
              </div>
              <div className="bg-gray-100 rounded-xl p-8">
                <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=300&width=500&text=Our+Mission"
                    alt="Our mission visualization"
                    className="max-h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-24 bg-gray-50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do at ScoutVision AI.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from our AI algorithms to our user experience. We're
                  committed to continuous improvement and innovation.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Inclusivity</h3>
                <p className="text-gray-600">
                  We believe in creating opportunities for all players, regardless of background or resources. Our
                  platform is designed to be accessible and affordable for clubs of all sizes.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <BarChart2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Data-Driven</h3>
                <p className="text-gray-600">
                  We believe in the power of objective data to drive better decisions. Our AI provides unbiased insights
                  that complement human expertise in player evaluation.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gray-100 rounded-xl p-8">
                  <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=300&width=500&text=Our+Team"
                      alt="Our team visualization"
                      className="max-h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Our Team</h2>
                <p className="text-lg text-gray-600 mb-6">
                  ScoutVision AI was founded by a team of sports enthusiasts, data scientists, and former professional
                  players who saw the need for innovation in football talent scouting. Our diverse team combines
                  expertise in artificial intelligence, computer vision, sports analytics, and professional football
                  experience.
                </p>
                <p className="text-lg text-gray-600">
                  We're passionate about using technology to unlock human potential and create a more meritocratic
                  pathway for talented players to reach their full potential.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-24 bg-gray-50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Impact</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                ScoutVision AI is making a difference in the football world.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-xl font-medium mb-2">Clubs</p>
                <p className="text-gray-600">
                  Football clubs of all sizes using our platform to discover and develop talent.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">15,000+</div>
                <p className="text-xl font-medium mb-2">Players</p>
                <p className="text-gray-600">Players analyzed and tracked through our AI-powered platform.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
                <p className="text-xl font-medium mb-2">Countries</p>
                <p className="text-gray-600">
                  Countries where ScoutVision AI is being used to transform football scouting.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
                <p className="text-xl font-medium mb-2">Success Stories</p>
                <p className="text-gray-600">Players who found professional opportunities through our platform.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
                <p className="text-xl font-medium mb-2">Hours of Footage</p>
                <p className="text-gray-600">Football footage analyzed by our AI algorithms.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-xl font-medium mb-2">Accuracy</p>
                <p className="text-gray-600">Accuracy rate of our AI in tracking player movements and actions.</p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-24">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Global Presence</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                ScoutVision AI is used by clubs and players around the world.
              </p>
            </div>

            <div className="aspect-[16/9] bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">World map showing ScoutVision AI's global presence</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6">Join the ScoutVision AI Community</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/auth/club/signup">
                  <Button size="lg" className="gap-2">
                    <Zap className="h-5 w-5" />
                    Get Started as a Club
                  </Button>
                </Link>
                <Link href="/auth/player">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Users className="h-5 w-5" />
                    Join as a Player
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
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
