import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

// Helper function to create tables if they don't exist
export const ensureTablesExist = async () => {
  try {
    // Check if profiles table exists
    const { error: checkError } = await supabase.from("profiles").select("id").limit(1)

    // If table doesn't exist, create it
    if (checkError && checkError.code === "42P01") {
      console.log("Creating database tables...")

      // Create profiles table
      await supabase.rpc("create_table", {
        table_name: "profiles",
        table_definition: `
          id UUID PRIMARY KEY REFERENCES auth.users(id),
          email TEXT NOT NULL,
          user_type TEXT NOT NULL CHECK (user_type IN ('club', 'player')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        `,
      })

      // Create club_profiles table
      await supabase.rpc("create_table", {
        table_name: "club_profiles",
        table_definition: `
          id UUID PRIMARY KEY REFERENCES profiles(id),
          club_name TEXT NOT NULL,
          logo_url TEXT,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        `,
      })

      // Create player_profiles table
      await supabase.rpc("create_table", {
        table_name: "player_profiles",
        table_definition: `
          id UUID PRIMARY KEY REFERENCES profiles(id),
          full_name TEXT NOT NULL,
          date_of_birth DATE,
          position TEXT,
          preferred_foot TEXT,
          height INTEGER,
          weight INTEGER,
          bio TEXT,
          club_id UUID REFERENCES club_profiles(id),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        `,
      })

      // Create player_codes table
      await supabase.rpc("create_table", {
        table_name: "player_codes",
        table_definition: `
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          code TEXT NOT NULL UNIQUE,
          club_id UUID REFERENCES club_profiles(id),
          player_id UUID REFERENCES player_profiles(id),
          is_used BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          expires_at TIMESTAMP WITH TIME ZONE
        `,
      })

      return true
    }

    return true
  } catch (error) {
    console.error("Error ensuring tables exist:", error)
    return false
  }
}
