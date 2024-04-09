import { createClient } from "@supabase/supabase-js";
import { LargeSecureStore } from "../../utils/largesecurestore";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://huapppqtqddwwlkfrhpe.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YXBwcHF0cWRkd3dsa2ZyaHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MjUxMzAsImV4cCI6MjAyNjMwMTEzMH0.u9UGprEWnRtg4ETbg_gx196Qjzm3Zw83e75ORJQ8Evg",
    {
        auth: {
            storage: new LargeSecureStore(),
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        }
    }
);