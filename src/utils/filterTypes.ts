export type EventCityTypes = "nyc" | "sf";
export const eventCityToAirportCode: Record<EventCityTypes, AirportCodeTypes> = {
    nyc: "JFK",
    sf: "SFO"
};
export const airportCodeToEventCity: Record<AirportCodeTypes, string> = {
    JFK: "nyc",
    SFO: "sf",
    ATL: "atl",
    LAX: "lax",
    ORD: "ord",
    DFW: "dfw",
    DEN: "den"
};

export const eventCityToNaturalLanguage: Record<EventCityTypes, string> = {
    nyc: "New York City",
    sf: "San Francisco"
};
export type AirportCodeTypes = "ATL" | "LAX" | "ORD" | "DFW" | "DEN" | "JFK" | "SFO";