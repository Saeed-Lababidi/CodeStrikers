import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Video, Check, ArrowRight } from "lucide-react"

export default function PricingPage() {
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
            <Link href="/features" className="font-medium">
              Features
            </Link>
            <Link href="/pricing" className="font-medium text-green-600">
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
                Simple, Transparent <span className="text-green-600">Pricing</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Choose the plan that's right for your club, with no hidden fees or long-term commitments.
              </p>
              <div className="inline-flex items-center rounded-full border p-1 mb-8">
                <button className="rounded-full px-4 py-2 bg-green-600 text-white font-medium">Monthly</button>
                <button className="rounded-full px-4 py-2 text-gray-700 font-medium">Annual (Save 20%)</button>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-bold mb-1">Starter</h3>
                  <p className="text-gray-500 mb-4">For small clubs and academies</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Up to 50 player profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>5 hours of video analysis per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Basic performance metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Player comparison tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Link href="/auth/club/signup">
                    <Button variant="outline" className="w-full">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white rounded-xl border-2 border-green-600 shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
                <div className="p-6 border-b">
                  <h3 className="text-lg font-bold mb-1">Professional</h3>
                  <p className="text-gray-500 mb-4">For established clubs</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">$249</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Up to 200 player profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>20 hours of video analysis per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Advanced performance metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Team analytics and reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>AI-powered insights and recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Priority email and chat support</span>
                    </li>
                  </ul>
                  <Link href="/auth/club/signup">
                    <Button className="w-full">Start Free Trial</Button>
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-bold mb-1">Enterprise</h3>
                  <p className="text-gray-500 mb-4">For professional clubs</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">$599</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Unlimited player profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Unlimited video analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Premium performance metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Advanced talent prediction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Custom reporting and API access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>24/7 priority support</span>
                    </li>
                  </ul>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our pricing and features.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-bold mb-2">What's included in the free trial?</h3>
                <p className="text-gray-600">
                  Our 14-day free trial includes full access to all features in the Professional plan, allowing you to
                  thoroughly test the platform before committing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-bold mb-2">Can I change plans later?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next
                  billing cycle.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-bold mb-2">How does video analysis work?</h3>
                <p className="text-gray-600">
                  Simply upload your match or training footage to our platform. Our AI will automatically track players,
                  analyze movements, and generate performance metrics within hours.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-bold mb-2">Do players need special equipment?</h3>
                <p className="text-gray-600">
                  No, our computer vision technology works with standard video footage. No special equipment, wearables,
                  or sensors are required for players.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-bold mb-2">Is there a discount for academies?</h3>
                <p className="text-gray-600">
                  Yes, we offer special pricing for youth academies and educational institutions. Please contact our
                  sales team for more information.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-bold mb-2">What kind of support is included?</h3>
                <p className="text-gray-600">
                  All plans include technical support. Professional and Enterprise plans include priority support with
                  faster response times and dedicated account managers.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 bg-green-600 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Ready to Transform Your Scouting Process?</h2>
              <p className="text-xl mb-8">Start your 14-day free trial today. No credit card required.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/auth/club/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Contact Sales
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
