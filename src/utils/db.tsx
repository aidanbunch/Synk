import {
	useQuery,
	QueryClient,
	QueryClientProvider as QueryClientProviderBase,
	UseQueryResult,
} from "react-query";
import supabase from "./supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

const client = new QueryClient();

// Fetch user data
export function useUser(uid: string) {
	return useQuery(
		["user", { uid }],
		() =>
			supabase.from("users").select(`*`).eq("id", uid).single().then(handle),
		{ enabled: !!uid }
	);
}

// Fetch user data (non-hook)
// if need to fetch data from outside of a component
export function getUser(uid: string) {
	return supabase.from("users").select(`*`).eq("id", uid).single().then(handle);
}

export async function updateUser(uid: string, data: any) {
	const response = await supabase
		.from("users")
		.update(data)
		.eq("id", uid)
		.then(handle);
	// Invalidate and refetch queries that could have old data
	await client.invalidateQueries(["user", { uid }]);
	return response;
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

export async function getEventFlowsWithImages(limit: number) {
	// // write code that first retrieves the first five event flows from the event_flows table
	// // then, for each event flow, retrieve the activity id (stored in activity column) from the event_flow_activities table row that has an event_flow matching the event flow id
	// // then, retrieve the image_url and name from the activities table row that has an id matching the activity id
	// // then, map the new image_url and activity name to the event flow object

	// const { data: eventFlowsData, error: eventFlowsError } = await supabase
	// 	.from("event_flows")
	// 	.select("*")
	// 	.limit(limit);

	// if (eventFlowsError) {
	// 	console.error("Error fetching event flows:", eventFlowsError);
	// 	return null;
	// }

	// const eventFlowsWithImages = await Promise.all(
	// 	eventFlowsData.map(async (eventFlow: any) => {
	// 		const { data: junctionData, error: junctionError } = await supabase
	// 			.from("event_flow_activities")
	// 			.select("activity")
	// 			.eq("event_flow", eventFlow.id);

	// 		if (junctionError || !junctionData || junctionData.length === 0) {
	// 			console.error("Error fetching junction:", junctionError);
	// 			return null;
	// 		}

	// 		const { data: activityData, error: activityError } = await supabase
	// 			.from("activities")
	// 			.select("image_url, name")
	// 			.eq("id", junctionData[0].activity);

	// 		if (activityError) {
	// 			console.error("Error fetching activity:", activityError);
	// 			return null;
	// 		}

	// 		return {
	// 			...eventFlow,
	// 			image: activityData[0].image_url,
	// 			activity: activityData[0].name,
	// 		};
	// 	})
	// );

	// return eventFlowsWithImages;

	return null;
}

export async function checkEventFlowExists(
	eventFlowUUID: string
): Promise<boolean | undefined> {
	const { data: activitiesData, error: activitiesError } = await supabase
		.from("event_flow_activities")
		.select("event_flow")
		.eq("event_flow", eventFlowUUID);

	if (activitiesError || !activitiesData) {
		return undefined;
	}

	const { data: flightsData, error: flightsError } = await supabase
		.from("event_flow_flights")
		.select("event_flow")
		.eq("event_flow", eventFlowUUID);

	if (flightsError || !flightsData) {
		return undefined;
	}

	const { data: hotelsData, error: hotelsError } = await supabase
		.from("event_flow_hotels")
		.select("event_flow")
		.eq("event_flow", eventFlowUUID);

	if (hotelsError || !hotelsData) {
		return undefined;
	}

	return (
		activitiesData.length > 0 || flightsData.length > 0 || hotelsData.length > 0
	);
}

// write new event flow to db
// event flow columns: id, owner, planSelections, event_name, num_attendees, budget, ideal_event_description, event_location, departing_location, start_date, end_date, booked
// types for each column: string, string, json stringified {stay: boolean,travel: boolean,activities: boolean}, string, number, number, string, string, date, date, boolean
export async function createEventFlow(
	owner: string,
	planSelections: string,
	event_name: string,
	num_attendees: number,
	budget: number,
	ideal_event_description: string,
	event_location: string,
	departing_location: string,
	start_date: Date,
	end_date: Date,
	booked: boolean
): Promise<string> {
	const { data, error } = await supabase
		.from("event_flows")
		.insert([
			{
				owner,
				planSelections,
				event_name,
				num_attendees,
				budget,
				ideal_event_description,
				event_location,
				departing_location,
				start_date,
				end_date,
				booked,
			},
		])
		.select();

	if (error) {
		// Handle error
		return error.message;
	}

	if (data) {
		return data[0].id; // Assuming the column name is "id"
	}
	return "";
}

export async function uploadEventFlowActivities(
	activityUUID: string,
	eventUUID: string
) {
	const { data, error } = await supabase
		.from("event_flow_activities")
		.insert([
			{
				event_flow: eventUUID,
				activity: activityUUID,
			},
		])
		.select();

	if (error) {
		// Handle error
		return error.message;
	}

	if (data) {
		return data[0].id; // Assuming the column name is "id"
	}
	return "";
}

export async function uploadEventFlowFlights(
	eventUUID: string,
	starting_time: string,
	ending_time: string,
	duration: string,
	price: number,
	airline_code: string,
	airline_name: string,
	airline_image: string
) {
	const flightUUID = uuidv4();

	// now we try to upload to the main flights table
	const { data: data, error: error } = await supabase
		.from("flights")
		.insert([
			{
				id: flightUUID,
				starting_time: starting_time,
				ending_time: ending_time,
				duration: duration,
				price: price,
				airline_code: airline_code,
				airline_name: airline_name,
				airline_image: airline_image,
			},
		])
		.select();

	if (error) {
		// Handle error
		return error.message;
	}

	const { data: data2, error: error2 } = await supabase
		.from("event_flow_flights")
		.insert([
			{
				event_flow: eventUUID,
				flight: flightUUID,
			},
		])
		.select();

	if (error2) {
		// Handle error
		return error2.message;
	}

	if (data) {
		return data[0].id; // Assuming the column name is "id"
	}
}

export async function uploadEventFlowHotels(
	eventUUID: string,
	hotel_name: string,
	total_price: number,
	image_url: string
) {
	const hotelUUID = uuidv4();

	// now we try to upload to the main flights table
	const { data: data, error: error } = await supabase
		.from("hotels")
		.insert([
			{
				id: hotelUUID,
				hotel_name: hotel_name,
				total_price: total_price,
				image_url: image_url,
			},
		])
		.select();

	if (error) {
		// Handle error
		return error.message;
	}

	const { data: data2, error: error2 } = await supabase
		.from("event_flow_hotels")
		.insert([
			{
				event_flow: eventUUID,
				hotel: hotelUUID,
			},
		])
		.select();

	if (error2) {
		// Handle error
		return error2.message;
	}

	if (data) {
		return data[0].id; // Assuming the column name is "id"
	}
}

// Get response data or throw error if there is one
function handle(response: PostgrestSingleResponse<any>): any {
	if (response.error) throw response.error;
	return response.data;
}

export function QueryClientProvider(props: any) {
	return (
		<QueryClientProviderBase client={client}>
			{props.children}
		</QueryClientProviderBase>
	);
}
