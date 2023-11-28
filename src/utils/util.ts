import { useRef, useEffect } from "react";
// @ts-ignore
import * as fx from "money";
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

// This function checks if the input date is before the compare date.
// It returns true if the input date is before the compare date, otherwise it returns false.
export function isDateBefore(inputDate: Date, compareDate: Date) {
	const inputTime = inputDate.getTime();
	const compareTime = compareDate.getTime();
	return inputTime < compareTime;
}

// function to check if input date and compare date are the same day
export function isSameDay(inputDate: Date, compareDate: Date) {
	const inputTime = inputDate.getTime();
	const compareTime = compareDate.getTime();
	return inputTime === compareTime;
}

export function formatPrice(price: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
}

// Set the rates relative to EUR
fx.rates = {
	EUR: 1,
	USD: 1.10, // This is the current rate.
};

// Function to convert EUR to USD
export function convertEURToUSD(amount: number): number {
	return fx.convert(amount, { from: "EUR", to: "USD" });
}
