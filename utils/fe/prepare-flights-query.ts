import { KIWI_DATE_FORMAT } from "@consts";
import { FlightsQueryArgs } from "./types.ts";
import { normalizeDate } from "./normalize-date.ts";

export const prepareFlightsQuery = ({
  eventDate,
  ...otherArgs
}: FlightsQueryArgs) => {
  const [dateFrom, dateTo, returnFrom, returnTo] = normalizeDate(
    eventDate,
    [-2, -1, 1, 2],
    KIWI_DATE_FORMAT,
  );
  console.log(
    "🚀 ~ file: prepare-flights-query.ts ~ line 14 ~ dateFrom, dateTo, returnFrom, returnTo",
    dateFrom,
    dateTo,
    returnFrom,
    returnTo,
  );

  return {
    dateTo,
    dateFrom,
    returnTo,
    returnFrom,
    ...otherArgs,
  };
};
