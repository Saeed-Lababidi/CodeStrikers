import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/db"
import { initializeDatabaseSimple } from "@/lib/db/simple-init"
import { dropAllTables } from "@/lib/db/utils"

export async function GET(request: Request) {
  try {
    // Check if we need to reset the database
    const url = new URL(request.url)
    const reset = url.searchParams.get("reset") === "true"
    const simple = url.searchParams.get("simple") === "true"

    if (reset) {
      // Drop all tables first
      const dropResult = await dropAllTables()
      if (!dropResult) {
        return NextResponse.json({ success: false, message: "Failed to reset database tables" }, { status: 500 })
      }
    }

    let result
    if (simple) {
      // Use the simple initialization without foreign keys
      result = await initializeDatabaseSimple()
      if (result) {
        return NextResponse.json({
          success: true,
          message: "Database initialized successfully (simple version without foreign keys)",
        })
      }
    } else {
      // Try the regular initialization with foreign keys
      result = await initializeDatabase()
      if (result) {
        return NextResponse.json({
          success: true,
          message: "Database initialized successfully with foreign keys",
        })
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to initialize database",
      },
      { status: 500 },
    )
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error initializing database",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
