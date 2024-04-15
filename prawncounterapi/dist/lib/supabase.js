"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL || "https://huapppqtqddwwlkfrhpe.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YXBwcHF0cWRkd3dsa2ZyaHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MjUxMzAsImV4cCI6MjAyNjMwMTEzMH0.u9UGprEWnRtg4ETbg_gx196Qjzm3Zw83e75ORJQ8Evg");
