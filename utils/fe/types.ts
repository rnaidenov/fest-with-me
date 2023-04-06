import { CurrencyCode, LatLong } from "../../types.ts";

export interface FlightsQueryArgs {
  currency: CurrencyCode;
  origin: string;
  destination: LatLong;
  numPeople: number;
  eventDate: string;
  nights: number;
}

export interface AccommodationQueryArgs {
  // TODO: Maybe enum
  eventDate: string;
  currency: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  numPeople: number;
}
