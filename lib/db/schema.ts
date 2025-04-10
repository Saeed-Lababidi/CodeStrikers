import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"

// Define the users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  user_type: text("user_type").notNull(),
  created_at: timestamp("created_at").defaultNow(),
})

// Define the club_profiles table
export const club_profiles = pgTable("club_profiles", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  club_name: text("club_name").notNull(),
  created_at: timestamp("created_at").defaultNow(),
})

// Define the player_profiles table
export const player_profiles = pgTable("player_profiles", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  full_name: text("full_name").notNull(),
  date_of_birth: text("date_of_birth").notNull(),
  position: text("position").notNull(),
  preferred_foot: text("preferred_foot").notNull(),
  height: text("height"),
  weight: text("weight"),
  bio: text("bio"),
  club_id: text("club_id").references(() => club_profiles.id, { onDelete: "set null" }),
  created_at: timestamp("created_at").defaultNow(),
})

// Define the player_codes table
export const player_codes = pgTable("player_codes", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  club_id: text("club_id")
    .notNull()
    .references(() => club_profiles.id, { onDelete: "cascade" }),
  player_id: text("player_id").references(() => player_profiles.id, { onDelete: "set null" }),
  is_used: boolean("is_used").default(false),
  created_at: timestamp("created_at").defaultNow(),
  expires_at: timestamp("expires_at").notNull(),
})
