import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Amadeus from "amadeus";

type HotelRequestBody = {
  attendees: number;
  cityCode: string;
};

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

// Function to make a GET request to the Bing Image API
async function getImageUrl(hotelName: string): Promise<string> {
  let delayres = await delay(400); // Free version means I can't do so many fetches so I just hardcoded delay
  const response = await fetch(
    `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(
      hotelName
    )}&count=1&offset=0&mkt=en-US&safeSearch=Moderate`,
    {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY_1 || "",
      },
    }
  );

  const data = await response.json();

  if (data.value && data.value.length > 0) {
    return data.value[0].contentUrl;
  } else {
    throw new Error("No image found");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { attendees, cityCode } = req.body as HotelRequestBody; // hm it seemed that req.query
  // may have worked when I test with a URL insetad of req.body

  try {
    var amadeus = new Amadeus({
      clientId: process.env.AMADEUS_API_KEY,
      clientSecret: process.env.AMADEUS_API_SECRET,
    });

    try {
      // Hotel ID Search
      const HotelIDs = await amadeus.referenceData.locations.hotels.byCity.get({
        cityCode: cityCode,
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
        totalPrice: String(Number(offer.offers[0].price.total) * attendees),
      }));

      // Array to hold the image URLs
      const imageUrls: string[] = [];

      // Use the function to make a request for each hotel
      for (const hotel of hotelNamesAndPrices) {
        const imageUrl = await getImageUrl(hotel.hotelName);
        imageUrls.push(imageUrl);
      }

      // Add the image URLs to the hotel names and prices
      const result = hotelNamesAndPrices.map((hotel, index) => ({
        ...hotel,
        imageUrl: imageUrls[index],
      }));

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
