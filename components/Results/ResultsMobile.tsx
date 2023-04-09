import { Carousel } from "../Carousel.tsx";
import { ResultCard } from "../ResultCard/ResultCard.tsx";
import { ResultsProps } from "./types.ts";

export const ResultsMobile = (
  { event, flights, accommodation, onPriceUpdate }: ResultsProps,
) => (
  <Carousel className="h-[50vh] block bg-white w-full md:hidden">
    <ResultCard
      name="Party"
      redirectUrl={event?.url}
      icon="/tickets.svg"
      price={event?.price}
      onPriceUpdate={onPriceUpdate}
    />
    <ResultCard
      name="Flight"
      redirectUrl={flights?.url}
      icon="/flight.svg"
      iconStyles="animate-plane"
      price={flights?.price}
      onPriceUpdate={onPriceUpdate}
    />
    <ResultCard
      name="Rest"
      redirectUrl={accommodation?.url}
      icon="/house.svg"
      price={accommodation?.price}
      onPriceUpdate={onPriceUpdate}
    />
  </Carousel>
);
