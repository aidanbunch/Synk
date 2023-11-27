import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import Amadeus from 'amadeus';

type FlightRequestBody = {
 attendees: number;
 departingAirport: string;
 arrivalAirport: string;
 departingDate: string;
 arrivalDate: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 const { attendees, departingAirport, arrivalAirport, departingDate, arrivalDate } = req.body as FlightRequestBody;

 try {
    var amadeus = new Amadeus({
        clientId: process.env.AMADEUS_API_KEY,
        clientSecret: process.env.AMADEUS_API_SECRET
      });
      
      amadeus.shopping.flightOffersSearch.get({
          originLocationCode: 'LAX',
          destinationLocationCode: 'SFO',
          departureDate: '2023-11-29',
          adults: '2'
      }).then((response: any) => {
        res.status(200).json(response);
      }).catch((responseError: any) => {
        res.status(500).json({message: error.message});
      });
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
}
