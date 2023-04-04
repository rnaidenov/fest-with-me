import Preact from "preact";

export enum CurrencyCode {
  "GBP" = "GBP",
  "USD" = "USD",
  "EUR" = "EUR",
}

export enum AccommodationType {
  PrivateRoom = "Private+room",
  SharedRoom = "Shared+room",
  EntireHome = "Entire home/apt",
}

export type Maybe<T> = T | null;

type BaseResultsData = {
  url: string;
  price: number;
};

export type EventData = BaseResultsData & {
  name: string;
  date: string;
};

export type FlightsData = BaseResultsData & {
  flyTo: string;
  flyFrom: string;
  inboundDate: string;
  outboundDate: string;
};

export type AccommodationData = BaseResultsData;
//  & {
//  price: {
//    shared: number;
//    private: number;
//    semiPrivate: number;
//  };
// }
// };

export type SearchResults = {
  event: EventData;
  flights: FlightsData;
  accommodation: AccommodationData;
};

export type SearchRef = {
  origin: string;
  event: {
    name: string;
    date: string;
  };
  numPeople: number;
  nights: number;
  destination: EventLocation;
  // EventName = "eventName",
  // EventDate = "eventDate",
  // Destination = "destination",
  // City = "destinationCity",
  // Country = "destinationCountry",
};

export type EventLocation = {
  area: string;
  country: string;
  club: string;
};

export type FlightsDestinationSplit = {
  city: string;
  country: string;
};

export type FlightsSearchQuery = {
  currency: CurrencyCode;
  origin: string;
  destination: FlightsDestinationSplit;
  numPeople: number;
  dateFrom: string;
  dateTo: string;
  returnFrom: string;
  returnTo: string;
};

export type AccommodationSearchQuery = {
  currency: CurrencyCode;
  numPeople: number;
  checkInDate: string;
  checkOutDate: string;
  city: string;
  country: string;
};

export enum SearchStatus {
  Init = 0,
  InProgress = 1,
  End = 2,
}

export type FCWithChildren = Preact.FC<{ children?: Preact.PreactNode }>;
