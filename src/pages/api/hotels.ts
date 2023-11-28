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
      const HotelIDs = await amadeus.referenceData.locations.hotels.byCity.get({
        cityCode: "LAX", // Change later
      });

      // Become CSV of hotelIDs
      const HotelIDsTruncated = HotelIDs.data.slice(0, 50);
      const data = Object.values(HotelIDsTruncated);
      const hotelIds = data.map((item) => item.hotelId);
      // Join the hotelId values into a CSV string
      const hotelIdsCSV = hotelIds.join(",");

      const hotelOfferALL = await amadeus.shopping.hotelOffersSearch.get({
        hotelIds: hotelIdsCSV,
        adults: "1",
      });

      const hotelOffers = hotelOfferALL.data.slice(0, 8);

      const hotelNamesAndPrices = hotelOffers.map((offer) => ({
        hotelName: offer.hotel.name,
        totalPrice: offer.offers[0].price.total,
      }));

      const result = hotelNamesAndPrices;

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
