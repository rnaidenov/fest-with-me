import {
  AccommodationData,
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
}

export interface ResultCardData {
  name: string;
  redirectUrl: string | undefined;
  icon: string;
  price: number | undefined;
  priceKey: "event" | "flights" | "accommodation";
}
