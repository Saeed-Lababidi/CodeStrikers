import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!)

// Initialize Drizzle ORM with the schema
export const db = drizzle(sql, { schema })

// Function to initialize database tables
export async function initializeDatabase() {
  try {
    // Create users table first
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        user_type TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create club_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS club_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        club_name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Add foreign key to club_profiles after table creation
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'club_profiles_user_id_fkey'
        ) THEN
          ALTER TABLE club_profiles 
          ADD CONSTRAINT club_profiles_user_id_fkey 
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `

    // Create player_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS player_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        date_of_birth TEXT NOT NULL,
        position TEXT NOT NULL,
        preferred_foot TEXT NOT NULL,
        height TEXT,
        weight TEXT,
        bio TEXT,
        club_id TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Add foreign keys to player_profiles after table creation
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'player_profiles_user_id_fkey'
        ) THEN
          ALTER TABLE player_profiles 
          ADD CONSTRAINT player_profiles_user_id_fkey 
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `

    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'player_profiles_club_id_fkey'
        ) THEN
          ALTER TABLE player_profiles 
          ADD CONSTRAINT player_profiles_club_id_fkey 
          FOREIGN KEY (club_id) REFERENCES club_profiles(id) ON DELETE SET NULL;
        END IF;
      END
      $$;
    `

    // Create player_codes table
    await sql`
      CREATE TABLE IF NOT EXISTS player_codes (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        club_id TEXT NOT NULL,
        player_id TEXT,
        is_used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `

    // Add foreign keys to player_codes after table creation
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'player_codes_club_id_fkey'
        ) THEN
          ALTER TABLE player_codes 
          ADD CONSTRAINT player_codes_club_id_fkey 
          FOREIGN KEY (club_id) REFERENCES club_profiles(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `

    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'player_codes_player_id_fkey'
        ) THEN
          ALTER TABLE player_codes 
          ADD CONSTRAINT player_codes_player_id_fkey 
          FOREIGN KEY (player_id) REFERENCES player_profiles(id) ON DELETE SET NULL;
        END IF;
      END
      $$;
    `

    console.log("Database tables initialized successfully")
    return true
  } catch (error) {
    console.error("Error initializing database tables:", error)
    return false
  }
}
