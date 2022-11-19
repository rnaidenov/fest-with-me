import { prepareAccommodationQuery } from "./prepare-accommodation-query.ts";
import { AccommodationQueryArgs } from "./types.ts";

export const searchAccommodation = (
  accommodationQuery: AccommodationQueryArgs,
) => {
  try {
    return fetch("/api/search/airbnb", {
      "method": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prepareAccommodationQuery(accommodationQuery)),
    }).then((res) => res.json());
  } catch (error: unknown) {
    console.error("- searchAccommodation() error -");
    console.error(String(error));
    console.error("- searchAccommodation() error -");
  }
};
