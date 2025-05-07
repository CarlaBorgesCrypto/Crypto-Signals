import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iyicnfwwkzxzzrlcxiuh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aWNuZnd3a3p4enpybGN4aXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1ODgwOTMsImV4cCI6MjA2MjE2NDA5M30.G5nrHe6_6rnqIQpeErhdfMLKgYWr24I9w6H5vjCezTk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
