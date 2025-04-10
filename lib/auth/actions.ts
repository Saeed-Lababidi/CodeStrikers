"use server"

import { db, initializeDatabase } from "../db"
import {
  generateId,
  generatePlayerCode,
  hashPassword,
  comparePassword,
  setSessionCookie,
  clearSessionCookies,
} from "./utils"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { eq } from "drizzle-orm"
import { initializeDatabaseSimple } from "../db/simple-init"
import * as schema from "../db/schema"

// Initialize database
export async function setupDatabase() {
  try {
    // First try with the regular initialization
    const result = await initializeDatabase()
    if (result) {
      return true
    }

    // If that fails, try the simple initialization
    console.log("Regular database initialization failed, trying simple version...")
    return await initializeDatabaseSimple()
  } catch (error) {
    console.error("Error setting up database:", error)
    return false
  }
}

// Sign up a club
export async function signUpClub(formData: FormData) {
  const clubName = formData.get("clubName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!clubName || !email || !password) {
    return {
      success: false,
      error: "All fields are required",
    }
  }

  try {
    // Initialize database if needed
    await setupDatabase()

    // Check if email already exists
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1)
      .then((rows: any[]) => rows[0] || null)

    if (existingUser) {
      return {
        success: false,
        error: "Email already in use",
      }
    }

    // Create user
    const userId = generateId()
    const passwordHash = await hashPassword(password)

    await db.insert(schema.users).values({
      id: userId,
      email,
      password_hash: passwordHash,
      user_type: "club",
    })

    // Create club profile
    const clubId = generateId()
    await db.insert(schema.club_profiles).values({
      id: clubId,
      user_id: userId,
      club_name: clubName,
    })

    // Set session cookie
    setSessionCookie(userId, "club")

    // Redirect to dashboard
    redirect("/dashboard")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error signing up club:", error)
    return {
      success: false,
      error: "An error occurred while creating your account",
    }
  }
}

// Sign in a user
export async function signInUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    }
  }

  try {
    // Initialize database if needed
    await setupDatabase()

    // Find user
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1)
      .then((rows: any[]) => rows[0] || null)

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    // Check password
    const passwordValid = await comparePassword(password, user.password_hash)

    if (!passwordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    // Set session cookie
    setSessionCookie(user.id, user.user_type as "club" | "player")

    // Redirect based on user type
    if (user.user_type === "club") {
      redirect("/dashboard")
    } else {
      redirect("/player/dashboard")
    }

    // This won't execute due to redirect, but needed for TypeScript
    return {
      success: true,
    }
  } catch (error) {
    console.error("Error signing in user:", error)
    return {
      success: false,
      error: "An error occurred while signing in",
    }
  }
}

// Sign out
export async function signOut() {
  clearSessionCookies()
  redirect("/")
}

// Generate a player code
export async function generatePlayerCodeAction() {
  try {
    // Initialize database if needed
    await setupDatabase()

    // Get current user
    const userId = (await cookies()).get("user_id")?.value

    if (!userId) {
      return {
        success: false,
        error: "Not authenticated",
      }
    }

    // Get club profile
    const clubProfile = await db
      .select()
      .from(schema.club_profiles)
      .where(eq(schema.club_profiles.user_id, userId))
      .limit(1)
      .then((rows: any[]) => rows[0] || null)

    if (!clubProfile) {
      return {
        success: false,
        error: "Club profile not found",
      }
    }

    // Generate code
    const code = generatePlayerCode()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // Expires in 7 days

    // Save code
    const codeId = generateId()
    await db.insert(schema.player_codes).values({
      id: codeId,
      code,
      club_id: clubProfile.id,
      is_used: false,
      expires_at: expiresAt,
    })

    return {
      success: true,
      code,
    }
  } catch (error) {
    console.error("Error generating player code:", error)
    return {
      success: false,
      error: "An error occurred while generating the player code",
    }
  }
}

// Verify a player code
export async function verifyPlayerCode(formData: FormData) {
  const code = formData.get("code") as string

  if (!code) {
    return {
      success: false,
      error: "Player code is required",
    }
  }

  try {
    // Check for static codes instead of database lookup
    if (code !== "NEW123" && code !== "PLAYER1") {
      return {
        success: false,
        error: "Invalid player code",
      }
    }

    // Generate a user ID
    const userId = generateId()

    // Set session cookie
    setSessionCookie(userId, "player")

    if (code === "PLAYER1") {
      // New player - redirect to onboarding
      redirect("/player/onboarding")
    } else {
      // Existing player - redirect to dashboard
      redirect("/player/dashboard")
    }

    // This won't execute due to redirect, but needed for TypeScript
    return {
      success: true,
      clubName: "Demo Club",
    }
  } catch (error) {
    console.error("Error verifying player code:", error)
    return {
      success: false,
      error: "An error occurred while verifying the player code",
    }
  }
}

// Complete player profile
export async function completePlayerProfile(formData: FormData) {
  const fullName = formData.get("fullName") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const position = formData.get("position") as string
  const preferredFoot = formData.get("preferredFoot") as string
  const height = formData.get("height") as string
  const weight = formData.get("weight") as string
  const bio = formData.get("bio") as string

  if (!fullName || !dateOfBirth || !position || !preferredFoot) {
    return {
      success: false,
      error: "Required fields are missing",
    }
  }

  try {
    // Initialize database if needed
    await setupDatabase()

    // Get current user
    const userId = (await cookies()).get("user_id")?.value

    if (!userId) {
      return {
        success: false,
        error: "Not authenticated",
      }
    }

    // Find player code to get club ID
    const playerCode = await db
      .select()
      .from(schema.player_codes)
      .where(eq(schema.player_codes.player_id, userId))
      .limit(1)
      .then((rows: any[]) => rows[0] || null)

    // Create player profile
    const profileId = generateId()
    await db.insert(schema.player_profiles).values({
      id: profileId,
      user_id: userId,
      full_name: fullName,
      date_of_birth: dateOfBirth,
      position,
      preferred_foot: preferredFoot,
      height: height || null,
      weight: weight || null,
      bio: bio || null,
      club_id: playerCode?.club_id || null,
    })

    // Redirect to dashboard
    redirect("/player/dashboard")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error completing player profile:", error)
    return {
      success: false,
      error: "An error occurred while saving your profile",
    }
  }
}
