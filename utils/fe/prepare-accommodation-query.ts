import { format } from "date-fns";
import { AIRBNB_DATE_FORMAT } from "@consts";
import { PrepareAccommodationQueryArgs } from "./types.ts";

export const prepareAccommodationQuery = (
  { currency, city, country, dateFrom, dateTo, numPeople }:
    PrepareAccommodationQueryArgs,
) => {
  const checkInDate = format(new Date(dateFrom), AIRBNB_DATE_FORMAT);
  console.log(
    "🚀 ~ file: prepare-airbnb-query.ts ~ line 10 ~ checkInDate",
    checkInDate,
  );
  const checkOutDate = format(new Date(dateTo), AIRBNB_DATE_FORMAT);
  console.log(
    "🚀 ~ file: prepare-airbnb-query.ts ~ line 12 ~ checkOutDate",
    checkOutDate,
  );

  // TODO: Date;
  return {
    currency,
    city,
    country,
    numPeople,
    checkInDate,
    checkOutDate,
  };
};
