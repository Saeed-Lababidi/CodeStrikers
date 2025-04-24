import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="font-medium">
              Features
            </Link>
            <Link href="/pricing" className="font-medium text-green-600">
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
                Simple, Transparent <span className="text-green-600">Pricing</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Choose the plan that's right for your club, with no hidden fees or long-term commitments.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="border rounded-xl p-8 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Starter</h2>
                  <p className="text-gray-600 mb-4">Perfect for small clubs and academies</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Up to 20 player profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>5 hours of video analysis per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Basic performance metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Player development tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link href="/auth/club/signup">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="border rounded-xl p-8 flex flex-col bg-green-50 border-green-200 relative">
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Professional</h2>
                  <p className="text-gray-600 mb-4">Ideal for established clubs and academies</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$249</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Up to 50 player profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>15 hours of video analysis per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Advanced performance metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Comparative player analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Potential prediction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Priority email and chat support</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link href="/auth/club/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="border rounded-xl p-8 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Enterprise</h2>
                  <p className="text-gray-600 mb-4">For professional clubs and organizations</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Unlimited player profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Unlimited video analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Premium performance metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Advanced talent identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Custom reporting and analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>24/7 priority support</span>
                  </li>
                </ul>
                <div className="mt-auto">
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

        <section className="py-16 bg-gray-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">Can I change plans later?</h3>
                  <p className="text-gray-600">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                    billing cycle.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">Is there a free trial?</h3>
                  <p className="text-gray-600">
                    Yes, we offer a 14-day free trial for all plans. No credit card required to start.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600">
                    We accept all major credit cards, PayPal, and bank transfers for annual plans.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">Can I cancel my subscription?</h3>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                    your current billing period.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-green-50">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team is here to help. Contact us for more information about our plans and features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">Contact Us</Button>
                </Link>
                <Link href="/auth/club/signup">
                  <Button variant="outline" size="lg">
                    Sign Up Now
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
