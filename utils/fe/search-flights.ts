import { FlightsQueryArgs } from "./types.ts";
import { prepareFlightsQuery } from "./prepare-flights-query.ts";

// TODO: Types
export const searchFlights = (flightsQuery: FlightsQueryArgs) => {
  try {
    return fetch("/api/search/kiwi", {
      "method": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prepareFlightsQuery(flightsQuery)),
    }).then((res) => res.json());
  } catch (error: unknown) {
    console.error("- searchFlights error() -");
    console.error(String(error));
    console.error("- searchFlights error() -");
    return null;
  }
};
