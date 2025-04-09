"use server"

import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"

// Validation schemas
const clubSignupSchema = z
  .object({
    clubName: z.string().min(2, "Club name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const playerProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  position: z.string().min(1, "Position is required"),
  preferredFoot: z.string().min(1, "Preferred foot is required"),
  height: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Height must be a number",
    }),
  weight: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Weight must be a number",
    }),
  bio: z.string().optional(),
})

// Check if Supabase is configured
const checkSupabaseConfig = () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not properly configured. Check your environment variables." }
  }
  return { success: true }
}

export async function signUpClub(formData: FormData) {
  const configCheck = checkSupabaseConfig()
  if (!configCheck.success) {
    return configCheck
  }

  const rawData = {
    clubName: formData.get("clubName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  try {
    // Validate input
    const validatedData = clubSignupSchema.parse(rawData)

    console.log("Signing up club with data:", {
      email: validatedData.email,
      clubName: validatedData.clubName,
    })

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          user_type: "club",
          club_name: validatedData.clubName,
        },
      },
    })

    if (error) {
      console.error("Supabase auth signup error:", error)
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: "User creation failed" }
    }

    console.log("User created successfully:", data.user.id)

    // Instead of trying to sign in immediately, we'll create the profile records
    // and then redirect to a success page or login page
    try {
      // Create profile record - using upsert to avoid duplicate key errors
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: validatedData.email,
          user_type: "club",
        },
        { onConflict: "id" },
      )

      if (profileError) {
        console.error("Error creating profile:", profileError)

        // If the error is a foreign key constraint, the profiles table might not exist
        if (profileError.code === "23503" || profileError.code === "42P01") {
          return {
            success: false,
            error: "Database setup incomplete. Please use the demo account instead.",
          }
        }

        return { success: false, error: profileError.message || "Error creating profile" }
      }

      // Create club profile
      const { error: clubError } = await supabase.from("club_profiles").upsert(
        {
          id: data.user.id,
          club_name: validatedData.clubName,
        },
        { onConflict: "id" },
      )

      if (clubError) {
        console.error("Error creating club profile:", clubError)

        // If the error is a foreign key constraint, the club_profiles table might not exist
        if (clubError.code === "23503" || clubError.code === "42P01") {
          return {
            success: false,
            error: "Database setup incomplete. Please use the demo account instead.",
          }
        }

        return { success: false, error: clubError.message || "Error creating club profile" }
      }

      // Return success with a message about email verification
      return {
        success: true,
        message: "Account created successfully! Please check your email for verification.",
        requiresEmailVerification: true,
      }
    } catch (dbError: any) {
      console.error("Database operation error:", dbError)
      return {
        success: false,
        error: dbError.message || "Database operation failed. Please try again or use the demo account.",
      }
    }
  } catch (error) {
    console.error("Signup error:", error)
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors
      return { success: false, fieldErrors }
    }
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}

export async function signInUser(formData: FormData) {
  // Always use demo credentials
  const email = "demo@scoutvision.ai"
  const password = "Demo123456!"

  try {
    console.log("Signing in with demo account")

    // Create the demo user if it doesn't exist
    try {
      // First try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!signInError && signInData.user) {
        console.log("Demo account sign-in successful")
        revalidatePath("/")
        redirect("/dashboard")
      }

      // If sign-in failed, create the account
      const { data: newUser, error: createError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: "club",
            club_name: "Demo Club",
          },
        },
      })

      if (createError) {
        console.error("Error creating demo account:", createError)
        return { success: false, error: "Failed to create demo account" }
      }

      if (newUser.user) {
        // Create profile record
        await supabase.from("profiles").upsert(
          {
            id: newUser.user.id,
            email,
            user_type: "club",
          },
          { onConflict: "id" },
        )

        // Create club profile
        await supabase.from("club_profiles").upsert(
          {
            id: newUser.user.id,
            club_name: "Demo Club",
            description: "This is a demo club account for testing purposes.",
          },
          { onConflict: "id" },
        )

        // Sign in with the newly created account
        const { error: finalSignInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (finalSignInError) {
          return { success: false, error: "Demo account created but sign-in failed" }
        }

        revalidatePath("/")
        redirect("/dashboard")
      }
    } catch (error) {
      console.error("Error with demo account:", error)
      return { success: false, error: "Error with demo account. Please try again." }
    }

    return { success: false, error: "An unexpected error occurred during sign in." }
  } catch (error) {
    console.error("Unexpected sign in error:", error)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}

export async function generatePlayerCode() {
  const configCheck = checkSupabaseConfig()
  if (!configCheck.success) {
    return configCheck
  }

  try {
    // Get the user ID from the session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "User not authenticated" }
    }

    // Generate a unique player code
    const code = uuidv4().substring(0, 8).toUpperCase()

    // Set expiration date (7 days from now)
    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    // Insert the code into the player_codes table
    const { data, error } = await supabase
      .from("player_codes")
      .insert([{ code: code, club_id: user.id, expires_at: expires_at }])
      .select()
      .single()

    if (error) {
      console.error("Error generating player code:", error)
      return { success: false, error: error.message }
    }

    return { success: true, code: data.code }
  } catch (error) {
    console.error("Unexpected error generating player code:", error)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}

export async function verifyPlayerCode(formData: FormData) {
  const configCheck = checkSupabaseConfig()
  if (!configCheck.success) {
    return configCheck
  }

  const code = formData.get("code") as string

  try {
    // Check if code exists and is not used
    const { data, error } = await supabase
      .from("player_codes")
      .select("*")
      .eq("code", code)
      .eq("is_used", false)
      .gt("expires_at", new Date().toISOString()) // Check if code is expired
      .single()

    if (error) {
      console.error("Error verifying player code:", error)
      return { success: false, error: "Invalid player code" }
    }

    if (!data) {
      return { success: false, error: "Invalid or expired player code" }
    }

    // Store the club_id in a cookie for later use
    const cookieStore = await cookies()
    cookieStore.set("club_id", data.club_id)

    revalidatePath("/")
    redirect("/player/onboarding")
  } catch (error) {
    console.error("Unexpected error verifying player code:", error)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}

export async function completePlayerProfile(formData: FormData) {
  const configCheck = checkSupabaseConfig()
  if (!configCheck.success) {
    return configCheck
  }

  const rawData = {
    fullName: formData.get("fullName") as string,
    dateOfBirth: formData.get("dateOfBirth") as string,
    position: formData.get("position") as string,
    preferredFoot: formData.get("preferredFoot") as string,
    height: formData.get("height") as string,
    weight: formData.get("weight") as string,
    bio: formData.get("bio") as string,
  }

  try {
    // Validate input
    const validatedData = playerProfileSchema.parse(rawData)

    // Get the user ID from the session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "User not authenticated" }
    }

    // Get the club_id from the cookie
    const cookieStore = await cookies()
    const club_id = cookieStore.get("club_id")?.value

    if (!club_id) {
      return { success: false, error: "Club ID not found. Please re-enter player code." }
    }

    // Insert the player profile data into the player_profiles table
    const { data: playerProfileData, error: playerProfileError } = await supabase
      .from("player_profiles")
      .insert([
        {
          id: user.id,
          full_name: validatedData.fullName,
          date_of_birth: validatedData.dateOfBirth,
          position: validatedData.position,
          preferred_foot: validatedData.preferredFoot,
          height: validatedData.height ? Number.parseInt(validatedData.height) : null,
          weight: validatedData.weight ? Number.parseInt(validatedData.weight) : null,
          bio: validatedData.bio,
          club_id: club_id,
        },
      ])
      .select()
      .single()

    if (playerProfileError) {
      console.error("Error creating player profile:", playerProfileError)
      return { success: false, error: playerProfileError.message }
    }

    // Mark the player code as used
    const { error: updateCodeError } = await supabase
      .from("player_codes")
      .update({ is_used: true, player_id: user.id })
      .eq("club_id", club_id)
      .eq("code", (await cookies()).get("player_code")?.value)

    if (updateCodeError) {
      console.error("Error updating player code:", updateCodeError)
      return { success: false, error: updateCodeError.message }
    }

    revalidatePath("/")
    redirect("/player/dashboard")
  } catch (error) {
    console.error("Signup error:", error)
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors
      return { success: false, fieldErrors }
    }
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  try {
    await supabase.auth.signOut()
    revalidatePath("/")
    redirect("/")
  } catch (error) {
    console.error("Error signing out:", error)
  }
}
