import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Amadeus from "amadeus";

type HotelRequestBody = {
	attendees: number;
	cityCode: string;
	limit: number;
};

export type HotelOffers = {
	hotelName: string;
	totalPrice: number;
	imageUrl: string;
};

type HotelResponseBody = {
	hotels: HotelOffers[];
};

const delay = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Function to make a GET request to the Bing Image API
async function getImageUrl(hotelName: string): Promise<string> {
	// await delay(400); // Free version means I can't do so many fetches so I just hardcoded delay

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
	const { attendees, cityCode, limit } = req.body as HotelRequestBody; // hm it seemed that req.query
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
			const hotelIds = data.map((item: any) => item.hotelId);
			// Join the hotelId values into a CSV string
			const hotelIdsCSV = hotelIds.join(",");

			const hotelOfferALL = await amadeus.shopping.hotelOffersSearch.get({
				hotelIds: hotelIdsCSV,
				adults: "1",
			});

			const hotelOffers = hotelOfferALL.data.slice(0, limit);
			const hotelNamesAndPrices = hotelOffers.map((offer: any) => ({
				hotelName: offer.hotel.name,
				totalPrice: String(Number(offer.offers[0].price.total) * attendees),
			}));

			// Array to hold the image URLs
			// const imageUrls: string[] = [];
			const imageUrls = [
				"https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
				"https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill",
				"https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
				"https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
				"https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg",
				"https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
				"https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=",
				"https://thumbs.dreamstime.com/b/hotel-room-beautiful-orange-sofa-included-43642330.jpg",
			];

			// // Use the function to make a request for each hotel
			// for (const hotel of hotelNamesAndPrices) {
			// 	const imageUrl = await getImageUrl(hotel.hotelName);
			// 	imageUrls.push(imageUrl);
			// }

			// Add the image URLs to the hotel names and prices
			const result = hotelNamesAndPrices.map((hotel: any, index: any) => ({
				...hotel,
				imageUrl: imageUrls[index],
			}));

			const resultWithIntPrices = result.map((item: any) => ({
				...item,
				totalPrice: parseFloat(item.totalPrice),
			})) as HotelOffers[];

			res.status(200).json({ hotels: resultWithIntPrices });
		} catch (error: any) {
			res.status(200).json(error);
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
}
