import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Amadeus from "amadeus";

type HotelRequestBody = {
  attendees: number;
  cityCode: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { attendees, cityCode } = req.body as HotelRequestBody;

  try {
    var amadeus = new Amadeus({
      clientId: process.env.AMADEUS_API_KEY,
      clientSecret: process.env.AMADEUS_API_SECRET,
    });

    try {
      // Hotel ID Search
      const HotelID_ALL = await amadeus.referenceData.locations.hotel.get({
        keyword: "Los Angeles", //cityCode,
        subType: "HOTEL_LEISURE",
      });

      // Cut to 8 Hotels
      const HotelIDs = HotelID_ALL.data.slice(0, 8);

      // Initialize an empty array to store the results
      const result = [];

      console.log(HotelIDs.length);

      // Iterate through each hotel
      for (let i = 0; i < HotelIDs.length; i++) {
        const hotel = HotelIDs[i];
        const hotelId = hotel.hotelIds[0];

        // Make a GET request for each hotel ID
        const hotelOffer = await amadeus.shopping.hotelOffers.get({
          hotelIds: hotelId,
          adults: "1",
        });

        // Add the result to the results array
        result.push(hotelOffer);
      }

      res.status(200).json(result);

      /*
      // Departing flight offers
      const departingResponse = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: departingAirport,
        destinationLocationCode: arrivalAirport,
        departureDate: departingDate,
        adults: attendees,
      });

      // Construct a JSON object to return them with the pricing information
      const result = {
        departing: departingOffers,
        arrival: arrivalOffers,
      };

      */

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
