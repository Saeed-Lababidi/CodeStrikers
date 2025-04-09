// This file represents the database schema we'll create in Supabase

/*
Tables:
1. profiles (extends Supabase auth.users)
   - id (UUID, primary key, references auth.users.id)
   - email (text, not null)
   - user_type (text, not null) - 'club' or 'player'
   - created_at (timestamp with time zone, default: now())
   - updated_at (timestamp with time zone, default: now())

2. club_profiles
   - id (UUID, primary key, references profiles.id)
   - club_name (text, not null)
   - logo_url (text)
   - description (text)
   - created_at (timestamp with time zone, default: now())
   - updated_at (timestamp with time zone, default: now())

3. player_profiles
   - id (UUID, primary key, references profiles.id)
   - full_name (text, not null)
   - date_of_birth (date, not null)
   - position (text, not null)
   - preferred_foot (text, not null)
   - height (integer) - in cm
   - weight (integer) - in kg
   - bio (text)
   - club_id (UUID, references club_profiles.id)
   - created_at (timestamp with time zone, default: now())
   - updated_at (timestamp with time zone, default: now())

4. player_codes
   - id (UUID, primary key)
   - code (text, not null, unique)
   - club_id (UUID, references club_profiles.id)
   - player_id (UUID, references player_profiles.id, nullable)
   - is_used (boolean, default: false)
   - created_at (timestamp with time zone, default: now())
   - expires_at (timestamp with time zone)

5. videos
   - id (UUID, primary key)
   - title (text, not null)
   - description (text)
   - url (text, not null)
   - thumbnail_url (text)
   - uploaded_by (UUID, references profiles.id)
   - created_at (timestamp with time zone, default: now())
   - updated_at (timestamp with time zone, default: now())

6. analysis
   - id (UUID, primary key)
   - video_id (UUID, references videos.id)
   - status (text, not null) - 'pending', 'processing', 'completed', 'failed'
   - results (jsonb)
   - created_at (timestamp with time zone, default: now())
   - updated_at (timestamp with time zone, default: now())

7. player_metrics
   - id (UUID, primary key)
   - player_id (UUID, references player_profiles.id)
   - analysis_id (UUID, references analysis.id)
   - technical_skills (integer) - 0-100
   - physical_attributes (integer) - 0-100
   - tactical_awareness (integer) - 0-100
   - decision_making (integer) - 0-100
   - team_play (integer) - 0-100
   - overall_rating (integer) - 0-100
   - created_at (timestamp with time zone, default: now())
*/

// This is just a representation of the schema, not actual code
// We'll use this as a reference for our TypeScript types
