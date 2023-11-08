import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "./_supabase";

// Get user by uid
function getUser(uid: string) {
	return supabase.from("users").select("*").eq("id", uid).single().then(handle);
}

function handle(response: PostgrestSingleResponse<any>) {
    if (response.error) throw response.error;
    return response.data;
}
