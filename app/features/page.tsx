import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Video, BarChart2, Activity, Users, Zap, Brain, ArrowRight, FileText, Star, Shield } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-green-600" />
            <span>ScoutVision AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/about" className="font-medium">
              About Us
            </Link>
            <Link href="/features" className="font-medium text-green-600">
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
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
                Powerful Features for <span className="text-green-600">Football Talent Scouting</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover how our AI-powered platform revolutionizes the way clubs identify, analyze, and develop
                football talent.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/auth/club/signup">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Core Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform combines advanced computer vision with AI analytics to provide comprehensive insights.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Video Analysis</h3>
                <p className="text-gray-600 mb-6">
                  Upload match or training footage and let our AI analyze player movements, positioning, and technical
                  skills with precision.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Automatic player tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Action recognition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Performance heatmaps</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <BarChart2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
                <p className="text-gray-600 mb-6">
                  Get detailed metrics on technical skills, physical attributes, and tactical awareness for
                  comprehensive player evaluation.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Technical skill assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Physical performance tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Tactical awareness scoring</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI Insights</h3>
                <p className="text-gray-600 mb-6">
                  Our AI provides actionable insights and recommendations based on player performance data and industry
                  benchmarks.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Strength & weakness identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Development recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Potential prediction</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <Container>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">For Clubs</h2>
                <p className="text-lg text-gray-600 mb-6">
                  ScoutVision AI helps clubs of all sizes make data-driven recruitment decisions and develop talent more
                  effectively.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Player Database</h3>
                      <p className="text-gray-600">
                        Maintain a comprehensive database of players with detailed performance metrics and development
                        tracking.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Talent Comparison</h3>
                      <p className="text-gray-600">
                        Compare players against each other or against position-specific benchmarks to identify the best
                        fit for your team.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <BarChart2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Scouting Reports</h3>
                      <p className="text-gray-600">
                        Generate comprehensive scouting reports with key metrics, insights, and development
                        recommendations.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Club+Dashboard"
                  alt="Club dashboard interface"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="order-2 md:order-1 bg-white rounded-xl border shadow-sm overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Player+Dashboard"
                  alt="Player dashboard interface"
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold tracking-tighter mb-6">For Players</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Players can track their performance, showcase their skills, and get discovered by top clubs.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Performance Tracking</h3>
                      <p className="text-gray-600">
                        Monitor your development with detailed metrics and progress tracking over time.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <Video className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Video Portfolio</h3>
                      <p className="text-gray-600">
                        Build a digital portfolio of your best performances with AI-analyzed highlights.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <Star className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Development Insights</h3>
                      <p className="text-gray-600">
                        Receive personalized feedback and development plans based on your performance data.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Additional Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                ScoutVision AI offers a comprehensive suite of tools to support your talent scouting and development
                needs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Custom Reports</h3>
                <p className="text-gray-600">
                  Generate customized reports focusing on specific aspects of player performance for different
                  stakeholders.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Team Analytics</h3>
                <p className="text-gray-600">
                  Analyze team performance, formations, and tactical patterns to optimize your squad selection and
                  strategy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Data Security</h3>
                <p className="text-gray-600">
                  Enterprise-grade security ensures your player data and analysis remains confidential and protected.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Injury Prevention</h3>
                <p className="text-gray-600">
                  AI algorithms identify potential injury risks based on movement patterns and physical metrics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <BarChart2 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Benchmarking</h3>
                <p className="text-gray-600">
                  Compare player metrics against position-specific benchmarks from different age groups and competition
                  levels.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Brain className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Talent Prediction</h3>
                <p className="text-gray-600">
                  Advanced AI models predict player potential and development trajectory based on performance data.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 bg-green-600 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Ready to Transform Your Scouting Process?</h2>
              <p className="text-xl mb-8">
                Join hundreds of clubs worldwide using ScoutVision AI to discover and develop football talent.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/auth/club/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    View Pricing
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
