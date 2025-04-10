import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "../db"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { eq } from "drizzle-orm"
import * as schema from "../db/schema"

// Generate a random ID
export function generateId(): string {
  return crypto.randomUUID()
}

// Generate a random player code
export function generatePlayerCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

// Compare a password with a hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// Set a session cookie
export function setSessionCookie(userId: string, userType: "club" | "player"): void {
  const sessionId = crypto.randomUUID()
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  cookies().set({
    name: "session_id",
    value: sessionId,
    httpOnly: true,
    expires,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  cookies().set({
    name: "user_id",
    value: userId,
    httpOnly: true,
    expires,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  cookies().set({
    name: "user_type",
    value: userType,
    httpOnly: true,
    expires,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

// Clear session cookies
export function clearSessionCookies(): void {
  cookies().delete("session_id")
  cookies().delete("user_id")
  cookies().delete("user_type")
}

// Get current user from cookies
export async function getCurrentUser() {
  const userId = cookies().get("user_id")?.value
  const userType = cookies().get("user_type")?.value as "club" | "player" | undefined

  if (!userId || !userType) {
    return null
  }

  try {
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1)
      .then((rows) => rows[0] || null)

    if (!user) {
      clearSessionCookies()
      return null
    }

    return {
      id: user.id,
      email: user.email,
      userType: user.user_type,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Require authentication
export async function requireAuth(redirectTo = "/") {
  const user = await getCurrentUser()

  if (!user) {
    redirect(redirectTo)
  }

  return user
}

// Require club authentication
export async function requireClubAuth(redirectTo = "/") {
  const user = await getCurrentUser()

  if (!user || user.userType !== "club") {
    redirect(redirectTo)
  }

  return user
}

// Require player authentication
export async function requirePlayerAuth(redirectTo = "/") {
  const user = await getCurrentUser()

  if (!user || user.userType !== "player") {
    redirect(redirectTo)
  }

  return user
}
