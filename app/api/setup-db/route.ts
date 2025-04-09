import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

export async function GET() {
  try {
    // Check if tables exist
    const { data: tablesData, error: tablesError } = await supabase.from("profiles").select("count").limit(1)

    if (tablesError && tablesError.code === "42P01") {
      // Tables don't exist, create them
      console.log("Creating database tables...")

      // Create profiles table
      await supabase.rpc("create_profiles_table")

      // Create club_profiles table
      await supabase.rpc("create_club_profiles_table")

      // Create player_profiles table
      await supabase.rpc("create_player_profiles_table")

      // Create player_codes table
      await supabase.rpc("create_player_codes_table")

      // Create videos table
      await supabase.rpc("create_videos_table")

      // Create analysis table
      await supabase.rpc("create_analysis_table")

      // Create player_metrics table
      await supabase.rpc("create_player_metrics_table")
    }

    // Create default user if it doesn't exist
    const defaultEmail = "demo@scoutvision.ai"
    const defaultPassword = "Demo123456!"

    // Check if user exists
    const { data: userData, error: userError } = await supabase.auth.signInWithPassword({
      email: defaultEmail,
      password: defaultPassword,
    })

    if (userError && userError.status === 400) {
      // User doesn't exist, create it
      console.log("Creating default user...")

      const { data: newUser, error: createError } = await supabase.auth.signUp({
        email: defaultEmail,
        password: defaultPassword,
        options: {
          data: {
            user_type: "club",
            club_name: "Demo Club",
          },
        },
      })

      if (createError) {
        return NextResponse.json({ success: false, error: createError.message }, { status: 500 })
      }

      if (newUser.user) {
        // Create profile record
        await supabase.from("profiles").insert({
          id: newUser.user.id,
          email: defaultEmail,
          user_type: "club",
        })

        // Create club profile
        await supabase.from("club_profiles").insert({
          id: newUser.user.id,
          club_name: "Demo Club",
          description: "This is a demo club account for testing purposes.",
        })
      }

      return NextResponse.json({
        success: true,
        message: "Database setup complete and default user created",
        credentials: {
          email: defaultEmail,
          password: defaultPassword,
        },
      })
    } else {
      return NextResponse.json({
        success: true,
        message: "Database is already set up and default user exists",
        credentials: {
          email: defaultEmail,
          password: defaultPassword,
        },
      })
    }
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json({ success: false, error: "Setup failed" }, { status: 500 })
  }
}
