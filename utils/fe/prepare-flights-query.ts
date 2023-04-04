import { KIWI_DATE_FORMAT } from "@consts";
import { FlightsQueryArgs } from "./types.ts";
import { normalizeDate } from "./normalize-date.ts";
import { FlightsSearchQuery } from "../../types.ts";

export const prepareFlightsQuery = ({
  eventDate,
  destination,
  ...otherArgs
}: FlightsQueryArgs): FlightsSearchQuery => {
  const [dateFrom, dateTo, returnFrom, returnTo] = normalizeDate(
    eventDate,
    [-2, -1, 1, 2],
    KIWI_DATE_FORMAT,
  );

  const { area: city, country } = destination;

  return {
    dateTo,
    dateFrom,
    returnTo,
    returnFrom,
    destination: {
      city,
      country,
    },
    ...otherArgs,
  };
};
