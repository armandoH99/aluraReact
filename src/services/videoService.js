import {createClient} from "@supabase/supabase-js";

const PROJECT_URL= "https://jmobredsdkxekxfivrtw.supabase.co";
const PROJECT_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptb2JyZWRzZGt4ZWt4Zml2cnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4NTg0NTMsImV4cCI6MTk4NTQzNDQ1M30.eGLLcccX5W9J4JIqtPuI_elmtQrbqM8dv5fDGhCkGhY"
const supabase = createClient(PROJECT_URL, PROJECT_KEY)

export function videoService() {
  return {
    getAllVideos() {
       return supabase
        .from("video")
        .select("*");
        
    },
  };
}
