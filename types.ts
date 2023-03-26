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

export type EventData = {
  name: string;
  date: string;
  url: string;
  price: number;
}[];

export type FlightsData = {
  flyFrom: string;
  flyTo: string;
  price: number;
  url: string;
  inboundDate: string;
  outboundDate: string;
};

export type AccommodationData = {
  price: {
    shared: number;
    private: number;
    semiPrivate: number;
  };
  url: string;
};

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
  destination: DestinationSplit;
  // EventName = "eventName",
  // EventDate = "eventDate",
  // Destination = "destination",
  // City = "destinationCity",
  // Country = "destinationCountry",
};

export type DestinationSplit = {
  area: string;
  country: string;
  club: string;
};

export type FlightsSearchQuery = {
  currency: CurrencyCode;
  origin: string;
  destination: DestinationSplit;
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
