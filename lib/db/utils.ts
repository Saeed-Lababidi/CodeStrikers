import { neon } from "@neondatabase/serverless"

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!)

// Function to check if a table exists
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = ${tableName}
      )
    `
    return result[0]?.exists || false
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error)
    return false
  }
}

// Function to drop all tables (useful for testing/reset)
export async function dropAllTables(): Promise<boolean> {
  try {
    // Drop tables in reverse order of dependencies
    await sql`DROP TABLE IF EXISTS player_codes CASCADE`
    await sql`DROP TABLE IF EXISTS player_profiles CASCADE`
    await sql`DROP TABLE IF EXISTS club_profiles CASCADE`
    await sql`DROP TABLE IF EXISTS users CASCADE`

    return true
  } catch (error) {
    console.error("Error dropping tables:", error)
    return false
  }
}
