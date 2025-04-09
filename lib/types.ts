export type UserType = "club" | "player"

export interface Profile {
  id: string
  email: string
  user_type: UserType
  created_at: string
  updated_at: string
}

export interface ClubProfile extends Profile {
  club_name: string
  logo_url?: string
  description?: string
}

export interface PlayerProfile extends Profile {
  full_name: string
  date_of_birth: string
  position: string
  preferred_foot: string
  height?: number
  weight?: number
  bio?: string
  club_id?: string
}

export interface PlayerCode {
  id: string
  code: string
  club_id: string
  player_id?: string
  is_used: boolean
  created_at: string
  expires_at?: string
}

export interface Video {
  id: string
  title: string
  description?: string
  url: string
  thumbnail_url?: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

export interface Analysis {
  id: string
  video_id: string
  status: "pending" | "processing" | "completed" | "failed"
  results?: any
  created_at: string
  updated_at: string
}

export interface PlayerMetrics {
  id: string
  player_id: string
  analysis_id: string
  technical_skills: number
  physical_attributes: number
  tactical_awareness: number
  decision_making: number
  team_play: number
  overall_rating: number
  created_at: string
}
