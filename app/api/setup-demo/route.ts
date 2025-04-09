import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

export async function GET() {
  try {
    // Create default user if it doesn't exist
    const defaultEmail = "demo@scoutvision.ai"
    const defaultPassword = "Demo123456!"

    // First, check if the required tables exist
    try {
      // Check if profiles table exists
      const { count: profileCount, error: profileCheckError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })

      // If profiles table doesn't exist, create it
      if (
        profileCheckError &&
        (profileCheckError.code === "42P01" || profileCheckError.message.includes("does not exist"))
      ) {
        console.log("Profiles table doesn't exist, creating it...")

        // Create profiles table using SQL
        const { error: createProfilesError } = await supabase.rpc("create_profiles_table")

        if (createProfilesError) {
          console.error("Error creating profiles table:", createProfilesError)
          return NextResponse.json(
            {
              success: false,
              error: "Failed to create profiles table. Database setup may require manual intervention.",
            },
            { status: 500 },
          )
        }
      }

      // Check if club_profiles table exists
      const { count: clubCount, error: clubCheckError } = await supabase
        .from("club_profiles")
        .select("*", { count: "exact", head: true })

      // If club_profiles table doesn't exist, create it
      if (clubCheckError && (clubCheckError.code === "42P01" || clubCheckError.message.includes("does not exist"))) {
        console.log("Club profiles table doesn't exist, creating it...")

        // Create club_profiles table using SQL
        const { error: createClubProfilesError } = await supabase.rpc("create_club_profiles_table")

        if (createClubProfilesError) {
          console.error("Error creating club_profiles table:", createClubProfilesError)
          return NextResponse.json(
            {
              success: false,
              error: "Failed to create club_profiles table. Database setup may require manual intervention.",
            },
            { status: 500 },
          )
        }
      }
    } catch (tableSetupError) {
      console.error("Error checking or creating tables:", tableSetupError)
      return NextResponse.json(
        {
          success: false,
          error: "Error setting up database tables. Please contact support.",
        },
        { status: 500 },
      )
    }

    // Now try to create or sign in with the demo account
    try {
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
          console.error("Error creating demo user:", createError)
          return NextResponse.json({ success: false, error: createError.message }, { status: 500 })
        }

        if (newUser.user) {
          // Create profile record
          const { error: profileError } = await supabase.from("profiles").upsert(
            {
              id: newUser.user.id,
              email: defaultEmail,
              user_type: "club",
            },
            { onConflict: "id" },
          )

          if (profileError) {
            console.error("Error creating demo profile:", profileError)
            return NextResponse.json(
              {
                success: false,
                error: "Failed to create demo profile: " + profileError.message,
              },
              { status: 500 },
            )
          }

          // Create club profile
          const { error: clubError } = await supabase.from("club_profiles").upsert(
            {
              id: newUser.user.id,
              club_name: "Demo Club",
              description: "This is a demo club account for testing purposes.",
            },
            { onConflict: "id" },
          )

          if (clubError) {
            console.error("Error creating demo club profile:", clubError)
            return NextResponse.json(
              {
                success: false,
                error: "Failed to create demo club profile: " + clubError.message,
              },
              { status: 500 },
            )
          }

          return NextResponse.json({
            success: true,
            message: "Demo user created successfully",
            credentials: {
              email: defaultEmail,
              password: defaultPassword,
            },
          })
        }
      } else if (userData) {
        // User exists, check if profiles exist
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single()

        if (profileError) {
          // Profile doesn't exist, create it
          const { error: createProfileError } = await supabase.from("profiles").upsert(
            {
              id: userData.user.id,
              email: defaultEmail,
              user_type: "club",
            },
            { onConflict: "id" },
          )

          if (createProfileError) {
            console.error("Error creating profile for existing user:", createProfileError)
            return NextResponse.json(
              {
                success: false,
                error: "Failed to create profile for existing user: " + createProfileError.message,
              },
              { status: 500 },
            )
          }
        }

        // Check if club profile exists
        const { data: clubData, error: clubError } = await supabase
          .from("club_profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single()

        if (clubError) {
          // Club profile doesn't exist, create it
          const { error: createClubError } = await supabase.from("club_profiles").upsert(
            {
              id: userData.user.id,
              club_name: "Demo Club",
              description: "This is a demo club account for testing purposes.",
            },
            { onConflict: "id" },
          )

          if (createClubError) {
            console.error("Error creating club profile for existing user:", createClubError)
            return NextResponse.json(
              {
                success: false,
                error: "Failed to create club profile for existing user: " + createClubError.message,
              },
              { status: 500 },
            )
          }
        }

        return NextResponse.json({
          success: true,
          message: "Demo user already exists and is ready to use",
          credentials: {
            email: defaultEmail,
            password: defaultPassword,
          },
        })
      }

      return NextResponse.json({
        success: true,
        message: "Demo account setup complete",
        credentials: {
          email: defaultEmail,
          password: defaultPassword,
        },
      })
    } catch (accountSetupError) {
      console.error("Error setting up demo account:", accountSetupError)
      return NextResponse.json(
        {
          success: false,
          error: "Error setting up demo account: " + (accountSetupError.message || "Unknown error"),
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Setup failed: " + (error.message || "Unknown error"),
      },
      { status: 500 },
    )
  }
}
