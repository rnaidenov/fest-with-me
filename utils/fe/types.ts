import { CurrencyCode, EventLocation } from "../../types.ts";

export interface FlightsQueryArgs {
  currency: CurrencyCode;
  origin: string;
  destination: EventLocation;
  numPeople: number;
  eventDate: string;
}

export interface AccommodationQueryArgs {
  // TODO: Maybe enum
  eventDate: string;
  currency: string;
  city: string;
  country: string;
  dateFrom: string;
  dateTo: string;
  numPeople: number;
}
