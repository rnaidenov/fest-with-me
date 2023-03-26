import { CurrencyCode } from "../../types.ts";

export interface FlightsQueryArgs {
  currency: CurrencyCode;
  origin: string;
  destination: string;
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
