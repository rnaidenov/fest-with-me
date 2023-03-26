import { FlightsQueryArgs } from "./types.ts";
import { prepareFlightsQuery } from "./prepare-flights-query.ts";

export const flightsQuery = (query: FlightsQueryArgs) => {
  try {
    return fetch("/api/search/flights", {
      "method": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prepareFlightsQuery(query)),
    }).then((res) => res.json());
  } catch (error: unknown) {
    console.error("- searchFlights error() -");
    console.error(String(error));
    console.error("- searchFlights error() -");
    return null;
  }
};
