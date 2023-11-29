import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "./_supabase";

// Get user by uid
function getUser(uid: string) {
	return supabase.from("users").select("*").eq("id", uid).single().then(handle);
}

export async function getEventFlowFromUUID(uuid: string) {
	const { data, error } = await supabase
		.from("event_flows")
		.select("*")
		.eq("id", uuid)
		.single();

	if (error) {
		console.error("Error fetching event flow:", error);
		return null;
	}

	return data;
}

export async function getActivity(activityUUID: string) {
	const { data, error } = await supabase
		.from("spaciously_activities")
		.select("*")
		.eq("id", activityUUID)
		.single();

	if (error) {
		console.error("Error fetching activity:", error);
		return null;
	}

	return data;
}

export async function getFlight(flightUUID: string) {
	const { data, error } = await supabase
		.from("flights")
		.select("*")
		.eq("id", flightUUID)
		.single();

	if (error) {
		console.error("Error fetching flight:", error);
		return null;
	}

	return data;
}

export async function getHotel(hotelUUID: string) {
	const { data, error } = await supabase
		.from("hotels")
		.select("*")
		.eq("id", hotelUUID)
		.single();

	if (error) {
		console.error("Error fetching hotel:", error);
		return null;
	}

	return data;
}

function handle(response: PostgrestSingleResponse<any>) {
    if (response.error) throw response.error;
    return response.data;
}
