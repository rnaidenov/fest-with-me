import { AccommodationSearchQuery } from "../../../../types.ts";

export const resultsUrl = (
  { destination, checkInDate, checkOutDate, numPeople, currency }:
    AccommodationSearchQuery,
) =>
  `https://www.airbnb.co.uk/s/homes?query=${destination}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${numPeople}&currency=${currency}`;
