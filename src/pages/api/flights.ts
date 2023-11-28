import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Amadeus from "amadeus";

type FlightRequestBody = {
	attendees: number;
	departingAirport: string;
	returnAirport: string;
	departingDate: string;
	returnDate: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		attendees,
		departingAirport,
		returnAirport: destinationAirport,
		departingDate,
		returnDate,
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
				destinationLocationCode: destinationAirport,
				departureDate: departingDate,
				adults: attendees,
			});

			// Return flight offers
			const returnResponse = await amadeus.shopping.flightOffersSearch.get({
				originLocationCode: destinationAirport,
				destinationLocationCode: departingAirport,
				departureDate: returnDate,
				adults: attendees,
			});

			// Get pricing for the first 5 offers from both requests
			const departingOffers = departingResponse.data.slice(0, 5);
			const returnOffers = returnResponse.data.slice(0, 5);

			// Construct a JSON object to return them with the pricing information
			const result = {
				departing: departingOffers,
				return: returnOffers,
			};

			res.status(200).json(result);
		} catch (error: any) {
			console.log(error.response); //=> The response object with (un)parsed data
			console.log(error.response.request); //=> The details of the request made
			console.log(error.code); //=> A unique error code to identify the type of error
			res.status(500).json(error.response);
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
}
