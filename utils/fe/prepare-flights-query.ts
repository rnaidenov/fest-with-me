import { addDays, format } from "date-fns";
import { KIWI_DATE_FORMAT } from "@consts";
import { QueryKey } from "@types";
import { PrepareKiwiQueryArgs } from "./types.ts";

export const prepareFlightsQuery = (
  { currency, origin, destination, numPeople, eventDate: date }:
    PrepareKiwiQueryArgs,
) => {
  const eventDate = new Date(date);

  const normalizedEventDate = format(eventDate, KIWI_DATE_FORMAT);
  const normalizedFromDate = format(addDays(eventDate, -2), KIWI_DATE_FORMAT);
  const normalizedToDate = format(addDays(eventDate, -1), KIWI_DATE_FORMAT);
  const normalizedReturnFromDate = format(
    addDays(eventDate, 1),
    KIWI_DATE_FORMAT,
  );
  const normalizedReturnToDate = format(
    addDays(eventDate, 2),
    KIWI_DATE_FORMAT,
  );

  console.log("normalizedEventDate", normalizedEventDate);

  // TODO: Date;
  return {
    origin,
    destination,
    numPeople,
    currency,
    dateFrom: normalizedFromDate,
    dateTo: normalizedToDate,
    returnFrom: normalizedReturnFromDate,
    returnTo: normalizedReturnToDate,
  };
};
