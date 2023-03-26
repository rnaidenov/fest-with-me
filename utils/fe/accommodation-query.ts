import { prepareAccommodationQuery } from "./prepare-accommodation-query.ts";
import { AccommodationQueryArgs } from "./types.ts";

export const accommodationQuery = (query: AccommodationQueryArgs) => {
  try {
    return fetch("/api/search/accommodation", {
      "method": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prepareAccommodationQuery(query)),
    }).then((res) => res.json());
  } catch (error: unknown) {
    console.error("- searchAccommodation() error -");
    console.error(String(error));
    console.error("- searchAccommodation() error -");
  }
};
