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
    venueId: string;
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
  geo: LatLong;
  address: string;
};

export type FlightsSearchQuery = {
  currency: CurrencyCode;
  origin: string;
  destination: LatLong;
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
  destination: string;
};

export enum SearchStatus {
  Init = 0,
  InProgress = 1,
  End = 2,
}

export type FCWithChildren = Preact.FC<{ children?: Preact.PreactNode }>;

export type LatLong = {
  "lat": number;
  "lng": number;
};
