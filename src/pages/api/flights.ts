import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Amadeus from "amadeus";

type FlightRequestBody = {
	attendees: number;
	departingAirport: string;
	arrivalAirport: string;
	departingDate: string;
	arrivalDate: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		attendees,
		departingAirport,
		arrivalAirport,
		departingDate,
		arrivalDate,
	} = req.body as FlightRequestBody;

	try {
		var amadeus = new Amadeus({
			clientId: process.env.AMADEUS_API_KEY,
			clientSecret: process.env.AMADEUS_API_SECRET,
		});

		try {
			// Departing flight offers
			const departingResponse = await amadeus.shopping.flightOffersSearch.get({
				originLocationCode: departingAirport,
				destinationLocationCode: arrivalAirport,
				departureDate: departingDate,
				adults: attendees,
			});

			// Arrival flight offers
			const arrivalResponse = await amadeus.shopping.flightOffersSearch.get({
				originLocationCode: arrivalAirport,
				destinationLocationCode: departingAirport,
				departureDate: arrivalDate,
				adults: attendees,
			});

			// Get pricing for the first 5 offers from both requests
			const departingOffers = departingResponse.data.slice(0, 5);
			const arrivalOffers = arrivalResponse.data.slice(0, 5);

			// Construct a JSON object to return them with the pricing information
			const result = {
				departing: departingOffers,
				arrival: arrivalOffers,
			};

			res.status(200).json(result);
		} catch (error: any) {
			console.log(error.response); //=> The response object with (un)parsed data
			console.log(error.response.request); //=> The details of the request made
			console.log(error.code); //=> A unique error code to identify the type of error
			res.status(200).json(error.response);
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
}
