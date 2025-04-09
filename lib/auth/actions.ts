"use server"

import { supabase } from "@/lib/supabase/client"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

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

export async function signUpClub(formData: FormData) {
  const rawData = {
    clubName: formData.get("clubName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  try {
    // Validate input
    const validatedData = clubSignupSchema.parse(rawData)

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
      return { success: false, error: error.message }
    }

    if (data.user) {
      // Create profile record
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: validatedData.email,
        user_type: "club",
      })

      if (profileError) {
        return { success: false, error: profileError.message }
      }

      // Create club profile
      const { error: clubError } = await supabase.from("club_profiles").insert({
        id: data.user.id,
        club_name: validatedData.clubName,
      })

      if (clubError) {
        return { success: false, error: clubError.message }
      }
    }

    revalidatePath("/")
    redirect("/dashboard")
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors
      return { success: false, fieldErrors }
    }
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function signInUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // Check user type and redirect accordingly
    const { data: profileData } = await supabase.from("profiles").select("user_type").eq("id", data.user.id).single()

    revalidatePath("/")

    if (profileData?.user_type === "player") {
      redirect("/player/dashboard")
    } else {
      redirect("/dashboard")
    }
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function verifyPlayerCode(formData: FormData) {
  const code = formData.get("code") as string

  try {
    // Check if code exists and is not used
    const { data, error } = await supabase
      .from("player_codes")
      .select("*")
      .eq("code", code)
      .eq("is_used", false)
      .single()

    if (error) {
      return { success: false, error: "Invalid or expired code" }
    }

    // Store code in cookies for the next step
    cookies().set("player_code", code, { maxAge: 3600 }) // 1 hour expiry

    revalidatePath("/")
    redirect("/player/onboarding")
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function completePlayerProfile(formData: FormData) {
  // Get the code from cookies
  const code = cookies().get("player_code")?.value

  if (!code) {
    return { success: false, error: "Player code not found. Please start again." }
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

    // Get the player code record
    const { data: codeData, error: codeError } = await supabase
      .from("player_codes")
      .select("*")
      .eq("code", code)
      .eq("is_used", false)
      .single()

    if (codeError) {
      return { success: false, error: "Invalid or expired code" }
    }

    // Create a temporary password
    const tempPassword = Math.random().toString(36).slice(-8)

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: `player_${Date.now()}@temp.scoutvision.ai`, // Temporary email
      password: tempPassword,
      options: {
        data: {
          user_type: "player",
        },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (data.user) {
      // Create profile record
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email!,
        user_type: "player",
      })

      if (profileError) {
        return { success: false, error: profileError.message }
      }

      // Create player profile
      const { error: playerError } = await supabase.from("player_profiles").insert({
        id: data.user.id,
        full_name: validatedData.fullName,
        date_of_birth: validatedData.dateOfBirth,
        position: validatedData.position,
        preferred_foot: validatedData.preferredFoot,
        height: validatedData.height ? Number.parseInt(validatedData.height) : null,
        weight: validatedData.weight ? Number.parseInt(validatedData.weight) : null,
        bio: validatedData.bio,
        club_id: codeData.club_id,
      })

      if (playerError) {
        return { success: false, error: playerError.message }
      }

      // Update player code to mark as used
      const { error: updateCodeError } = await supabase
        .from("player_codes")
        .update({
          is_used: true,
          player_id: data.user.id,
        })
        .eq("id", codeData.id)

      if (updateCodeError) {
        return { success: false, error: updateCodeError.message }
      }

      // Clear the cookie
      cookies().delete("player_code")

      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.user.email!,
        password: tempPassword,
      })

      if (signInError) {
        return { success: false, error: signInError.message }
      }

      revalidatePath("/")
      redirect("/player/dashboard")
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors
      return { success: false, fieldErrors }
    }
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function generatePlayerCode() {
  try {
    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Not authenticated" }
    }

    // Generate a random code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Set expiry date to 7 days from now
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    // Insert the code
    const { data, error } = await supabase
      .from("player_codes")
      .insert({
        code,
        club_id: session.user.id,
        is_used: false,
        expires_at: expiresAt.toISOString(),
      })
      .select()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, code }
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    redirect("/")
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" }
  }
}
