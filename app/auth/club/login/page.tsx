"use client";

import type React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function ClubLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [showResendModal, setShowResendModal] = useState(false);
  const [showNewResendModal, setShowNewResendModal] = useState(false);
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown === 0) return;

    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendCooldown]);

  useEffect(() => {
    const start = localStorage.getItem("resendCooldownStart");
    if (start) {
      const secondsPassed = Math.floor((Date.now() - Number(start)) / 1000);
      const remaining = 180 - secondsPassed;
      if (remaining > 0) {
        setResendCooldown(remaining);
      }
    }
  }, []);

  useEffect(() => {
    setShowLoginErrorModal(false);
  }, [email, password]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("signup") === "success" && resendCooldown === 0) {
      setShowNewResendModal(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        toast({
          title: "Email not confirmed",
          description:
            "Check your inbox or click below to resend confirmation.",
          variant: "destructive",
        });
        setShowResendModal(true);
      } else {
        toast({
          title: "Login failed",
          description: "Username and/or password is incorrect",
          variant: "destructive",
        });
        setShowLoginErrorModal(true);
      }
    } else {
      toast({ title: "Login successful" });
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  const handleResendConfirmation = async () => {
    if (resendCooldown > 0) return;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Confirmation sent",
        description: "Check your email to confirm your account.",
      });
      setResendCooldown(180);
      localStorage.setItem("resendCooldownStart", Date.now().toString());
    }
  };

  const handleBypass = async () => {
    // Set cookies manually
    document.cookie = `session_id=bypass-${Date.now()};path=/;max-age=${
      7 * 24 * 60 * 60
    }`;
    document.cookie = `user_id=bypass-user-${Date.now()};path=/;max-age=${
      7 * 24 * 60 * 60
    }`;
    document.cookie = `user_type=club;path=/;max-age=${7 * 24 * 60 * 60}`;

    toast({
      title: "Success",
      description: "Bypassing authentication...",
    });

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>
        </Container>
      </header>

      <main className="flex-1 flex items-center justify-center py-10">
        <Container>
          <div className="max-w-md mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Club Login</CardTitle>
                <CardDescription>
                  Sign in to your club account to access the scouting dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/auth/club/reset-password"
                        className="text-xs text-gray-500 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleBypass}
                  >
                    <Unlock className="h-4 w-4" />
                    <span>Bypass Authentication (Demo)</span>
                  </Button>
                </form>
                {showNewResendModal && (
                  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center space-y-4">
                      <h2 className="text-2xl font-semibold">
                        🎉 One last Step! 🎉
                      </h2>
                      <p className="text-lg">
                        You must confirm your email before logging in.
                      </p>
                      <p className="text-sm text-gray-600">
                        Please check your inbox. If you don't see it, check your
                        spam folder.
                      </p>
                      <Button
                        onClick={handleResendConfirmation}
                        className="w-full"
                        disabled={resendCooldown > 0}
                      >
                        {resendCooldown > 0
                          ? `Resend available in ${resendCooldown}s`
                          : "Resend Confirmation Email"}
                      </Button>
                      <button
                        className="text-sm text-gray-500 hover:underline mt-2"
                        onClick={() => setShowNewResendModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {showResendModal && (
                  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center space-y-4">
                      <h2 className="text-2xl font-semibold">
                        Confirm your email 😅
                      </h2>
                      <p className="text-lg">
                        You must confirm your email before logging in.
                      </p>
                      <p className="text-sm text-gray-600">
                        Please check your inbox. If you don't see it, check your
                        spam folder.
                      </p>
                      <Button
                        onClick={handleResendConfirmation}
                        className="w-full"
                        disabled={resendCooldown > 0}
                      >
                        {resendCooldown > 0
                          ? `Resend available in ${resendCooldown}s`
                          : "Resend Confirmation Email"}
                      </Button>
                      <button
                        className="text-sm text-gray-500 hover:underline mt-2"
                        onClick={() => setShowResendModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {showLoginErrorModal && (
                  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center space-y-4">
                      <h2 className="text-lg font-semibold">Login failed</h2>
                      <p className="text-sm text-gray-600">
                        Username and/or password is incorrect. Please try again.
                      </p>
                      <Button
                        onClick={() => setShowLoginErrorModal(false)}
                        className="w-full"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/club/signup"
                    className="text-green-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </main>

      <footer className="border-t py-6">
        <Container className="flex justify-center">
          <p className="text-center text-sm text-gray-500">
            © 2025 CodeStrikers. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
