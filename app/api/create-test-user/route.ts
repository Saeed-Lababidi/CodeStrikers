import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Generate a test user ID
    const userId = crypto.randomUUID()
    const clubId = crypto.randomUUID()

    // Create a test user with a known password
    const email = "test@example.com"
    const password = "password123"
    const passwordHash = await bcrypt.hash(password, 10)

    // Insert directly with SQL
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        user_type TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS club_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        club_name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert the user
    await sql`
      INSERT INTO users (id, email, password_hash, user_type)
      VALUES (${userId}, ${email}, ${passwordHash}, 'club')
      ON CONFLICT (email) DO NOTHING
    `

    // Insert the club profile
    await sql`
      INSERT INTO club_profiles (id, user_id, club_name)
      VALUES (${clubId}, ${userId}, 'Test Club')
      ON CONFLICT (user_id) DO NOTHING
    `

    return NextResponse.json({
      success: true,
      message: "Test user created successfully",
      credentials: {
        email: email,
        password: password,
      },
    })
  } catch (error) {
    console.error("Error creating test user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error creating test user",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
