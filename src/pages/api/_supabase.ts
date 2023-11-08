import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SECRET_KEY || ""
)
export default supabase;
