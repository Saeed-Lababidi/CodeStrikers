import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Video, Shield, Zap, Users, Award, BarChart, LineChart, TrendingUp, Eye, Brain } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="font-medium text-green-600">
              Features
            </Link>
            <Link href="/pricing" className="font-medium">
              Pricing
            </Link>
            <Link href="/about" className="font-medium">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/club/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/club/signup" className="hidden md:block">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Advanced Features for <span className="text-green-600">Modern Scouting</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Discover how our AI-powered platform revolutionizes football talent identification and development.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Video Analysis</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our advanced AI algorithms analyze player movements, decisions, and technical skills from standard
                  match or training footage.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Eye className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Automated Player Tracking</h3>
                      <p className="text-gray-600">
                        Our system automatically identifies and tracks players throughout the video, even in crowded
                        scenes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Action Recognition</h3>
                      <p className="text-gray-600">
                        Identifies key actions like passes, shots, tackles, and dribbles with high accuracy.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <BarChart className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Performance Metrics</h3>
                      <p className="text-gray-600">
                        Generates comprehensive metrics on technical skills, physical attributes, and tactical
                        awareness.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 aspect-video rounded-xl flex items-center justify-center">
                <Video className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-gray-50">
          <Container>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-gray-200 aspect-video rounded-xl flex items-center justify-center">
                <LineChart className="h-16 w-16 text-gray-400" />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">Performance Analytics</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our platform provides detailed analytics on player performance, helping clubs make data-driven
                  decisions about talent identification and development.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Development Tracking</h3>
                      <p className="text-gray-600">
                        Track player progress over time with comprehensive performance metrics and growth indicators.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Comparative Analysis</h3>
                      <p className="text-gray-600">
                        Compare players against teammates, opponents, or benchmark standards for their age group.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Potential Prediction</h3>
                      <p className="text-gray-600">
                        AI-driven predictions of player potential based on performance data and development trajectory.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Player Development</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our platform helps players understand their strengths and weaknesses, providing personalized
                  development plans to improve their game.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Personalized Feedback</h3>
                      <p className="text-gray-600">
                        Receive detailed feedback on your performance with specific areas for improvement.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Training Recommendations</h3>
                      <p className="text-gray-600">
                        Get tailored training exercises and drills based on your specific development needs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <BarChart className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Progress Tracking</h3>
                      <p className="text-gray-600">
                        Monitor your improvement over time with clear visualizations and performance metrics.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 aspect-video rounded-xl flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-green-50">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Scouting?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join ScoutVision AI today and discover the next generation of football talent with our cutting-edge
                technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/club/signup">
                  <Button size="lg">Get Started</Button>
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
      </main>

      <footer className="border-t py-6">
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
