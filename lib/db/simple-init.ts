// import { neon } from "@neondatabase/serverless"

// // Initialize Neon client
// const sql = neon(process.env.DATABASE_URL!)

// // Simple function to initialize database tables without foreign keys
// export async function initializeDatabaseSimple() {
//   try {
//     // Create users table
//     await sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id TEXT PRIMARY KEY,
//         email TEXT UNIQUE NOT NULL,
//         password_hash TEXT NOT NULL,
//         user_type TEXT NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `

//     // Create club_profiles table without foreign key
//     await sql`
//       CREATE TABLE IF NOT EXISTS club_profiles (
//         id TEXT PRIMARY KEY,
//         user_id TEXT UNIQUE NOT NULL,
//         club_name TEXT NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `

//     // Create player_profiles table without foreign keys
//     await sql`
//       CREATE TABLE IF NOT EXISTS player_profiles (
//         id TEXT PRIMARY KEY,
//         user_id TEXT UNIQUE NOT NULL,
//         full_name TEXT NOT NULL,
//         date_of_birth TEXT NOT NULL,
//         position TEXT NOT NULL,
//         preferred_foot TEXT NOT NULL,
//         height TEXT,
//         weight TEXT,
//         bio TEXT,
//         club_id TEXT,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `

//     // Create player_codes table without foreign keys
//     await sql`
//       CREATE TABLE IF NOT EXISTS player_codes (
//         id TEXT PRIMARY KEY,
//         code TEXT UNIQUE NOT NULL,
//         club_id TEXT NOT NULL,
//         player_id TEXT,
//         is_used BOOLEAN DEFAULT FALSE,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//         expires_at TIMESTAMP WITH TIME ZONE NOT NULL
//       )
//     `

//     console.log("Database tables initialized successfully (simple version)")
//     return true
//   } catch (error) {
//     console.error("Error initializing database tables (simple version):", error)
//     return false
//   }
// }
