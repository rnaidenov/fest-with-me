import { AIRBNB_DATE_FORMAT } from "@consts";
import { AccommodationQueryArgs } from "./types.ts";
import { normalizeDate } from "./normalize-date.ts";

export const prepareAccommodationQuery = (
  { eventDate, dateFrom, dateTo, ...otherArgs }: AccommodationQueryArgs,
) => {
  const checkInDate = dateFrom ??
    normalizeDate(eventDate, [-2], AIRBNB_DATE_FORMAT)[0];
  const checkOutDate = dateTo ??
    normalizeDate(eventDate, [-2], AIRBNB_DATE_FORMAT)[0];

  return {
    checkInDate,
    checkOutDate,
    ...otherArgs,
  };
};
