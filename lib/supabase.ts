import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nojmkxojhyvzhwzvxfnv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vam1reG9qaHl2emh3enZ4Zm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMjU3NjQsImV4cCI6MjAzODgwMTc2NH0.1GeUzHAvhvlYQLH4J3qY_4eA19LJ6zus6L36ouLI0NY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
