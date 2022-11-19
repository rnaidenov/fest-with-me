export interface PrepareKiwiQueryArgs {
  currency: string;
  origin: string;
  destination: string;
  numPeople: number;
  eventDate: string;
}

export interface PrepareAccommodationQueryArgs {
  // TODO: Maybe enum
  currency: string;
  city: string;
  country: string;
  dateFrom: string;
  dateTo: string;
  numPeople: number;
}
