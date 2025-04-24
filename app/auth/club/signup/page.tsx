"use client";

import type React from "react";
import { useState } from "react";
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
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function ClubSignupPage() {
  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [clubNameError, setClubNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePasswordStrength = (password: string) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
    return strength;
  };

  function getPasswordStrengthText(password: string) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    if (strength >= 4) return "Strong";
    return "weak";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setClubNameError("");

    let hasError = false;

    if (!clubName.trim()) {
      setClubNameError("Club name is required.");
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      hasError = true;
    }

    if (!validatePasswordStrength(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include a number and uppercase letter."
      );
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { club_name: clubName },
      },
    });

    if (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signup successful",
        description: "Check your email to confirm.",
      });
      router.push("/auth/club/login?signup=success");
    }

    setIsLoading(false);
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
                <CardTitle className="text-2xl">Create Club Account</CardTitle>
                <CardDescription>
                  Sign up for a club account to start scouting and analyzing
                  talent.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clubName">Club Name</Label>
                    <Input
                      id="clubName"
                      placeholder="Enter your club name"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                    />
                    {clubNameError && (
                      <p className="text-sm text-red-500">{clubNameError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <p className="text-sm text-red-500">{emailError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordStrength(
                            getPasswordStrengthText(e.target.value)
                          );
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {password && (
                      <p
                        className={`text-sm ${
                          passwordStrength === "Strong"
                            ? "text-green-600"
                            : passwordStrength === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        Strength: {passwordStrength}
                      </p>
                    )}

                    {/* Password Strength Bar */}
                    {password && (
                      <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            getPasswordStrength(password) <= 2
                              ? "bg-red-500 w-1/5"
                              : getPasswordStrength(password) === 3
                              ? "bg-yellow-500 w-3/5"
                              : getPasswordStrength(password) >= 4
                              ? "bg-green-500 w-full"
                              : ""
                          }`}
                        />
                      </div>
                    )}
                    {passwordError && (
                      <p className="text-sm text-red-500">{passwordError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="flex">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {confirmPasswordError && (
                      <p className="text-sm text-red-500">
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/auth/club/login"
                    className="text-green-600 hover:underline"
                  >
                    Sign in
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
