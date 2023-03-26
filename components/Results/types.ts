import {
  AccommodationData,
  CurrencyCode,
  EventData,
  FlightsData,
  Maybe,
} from "../../types.ts";

export interface ResultsProps {
  event: Maybe<EventData> | undefined;
  flights: Maybe<FlightsData> | undefined;
  accommodation: Maybe<AccommodationData> | undefined;
  onPriceUpdate: (
    field: "event" | "flights" | "accommodation",
  ) => (price: number) => void;
  currency: CurrencyCode;
}
