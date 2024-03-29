import { KIWI_DATE_FORMAT } from "@consts";
import { FlightsQueryArgs } from "./types.ts";
import { normalizeDate } from "./normalize-date.ts";
import { FlightsSearchQuery } from "../../types.ts";

export const prepareFlightsQuery = ({
  eventDate,
  nights,
  ...otherArgs
}: FlightsQueryArgs): FlightsSearchQuery => {
  const [dateFrom, dateTo, returnFrom, returnTo] = normalizeDate(
    eventDate,
    [-2, -1, nights - 2, nights],
    KIWI_DATE_FORMAT,
  );

  return {
    dateTo,
    dateFrom,
    returnTo,
    returnFrom,
    ...otherArgs,
  };
};
