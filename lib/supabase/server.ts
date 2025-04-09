import { createClient } from "@supabase/supabase-js";

// These MUST come from your `.env` file (safe on the server only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // 👈 NOT the anon key

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
