import { AccommodationSearchQuery } from "../../../../types.ts";

export const resultsUrl = (
  { city, country, checkInDate, checkOutDate, numPeople, currency }:
    AccommodationSearchQuery,
) =>
  `https://www.airbnb.co.uk/s/homes?query=${city},${country}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${numPeople}&currency=${currency}`;
