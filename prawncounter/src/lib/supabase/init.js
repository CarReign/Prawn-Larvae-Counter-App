import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.EXPO_SUPABASE_URL,
    process.env.EXPO_SUPABASE_KEY, {
    localStorage: AsyncStorage,
    detectSessionInUrl: false,
});