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
export function apiRequest(url: string, method = "GET", data: any) {
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

export function isDateAfter(inputDate: Date, compareDate: Date) {
	const inputTime = inputDate.getTime();
	const compareTime = compareDate.getTime();
	return inputTime > compareTime;
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

// function to convert normal Date to "2023-12-01" in the string format
export function convertDateToString(date: Date): string {
	return date.toISOString().split("T")[0];
}

// convert string "2023-12-01" to Date
export function convertStringToDate(dateString: string): Date {
	return new Date(dateString);
}

// find range of days between two days, for example between 11-06 and 11-8 is 2 days so the function returns 2
// params are startDate and endDate
export function findRangeOfDays(startDate: Date, endDate: Date): number {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
	return diffDays;
}

export function isDateInPast(date: Date): boolean {
	const today = new Date();
	return date < today;
}
