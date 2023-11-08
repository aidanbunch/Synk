import { useRef, useEffect } from "react";
import supabase from "./supabase";

class FetchErrorResponse extends Error {
	status: string;
	code: string;

	constructor(status: string, code: string, message?: string) {
		super(message);
		this.status = status;
		this.code = code;
	}
}

// Make an API request to `/api/{path}`
export async function apiRequestInternal(
	path: string,
	method = "GET",
	data: any
) {
	const {
		data: { session: session },
	} = await supabase.auth.getSession();
	const accessToken = session ? session.access_token : undefined;

	return fetch(`/api/${path}`, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: data ? JSON.stringify(data) : undefined,
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.status === "error") {
				// Automatically signout user if accessToken is no longer valid
				if (response.code === "auth/invalid-user-token") {
					supabase.auth.signOut();
				}

				throw new FetchErrorResponse(response.code, response.message);
			} else {
				return response.data;
			}
		});
}

// Make an API request to any external URL
export function apiRequestExternal(url: string, method = "GET", data: any) {
	return fetch(url, {
		method: method,
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		body: data ? JSON.stringify(data) : undefined,
	}).then((response) => response.json());
}

// Hook that returns previous value of state
export function usePrevious(state: any) {
	const ref = useRef();
	useEffect(() => {
		ref.current = state;
	});
	return ref.current;
}
