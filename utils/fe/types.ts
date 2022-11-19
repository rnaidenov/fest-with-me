export interface FlightsQueryArgs {
  currency: string;
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
