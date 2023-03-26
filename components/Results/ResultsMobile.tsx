import { Carousel } from "../Carousel.tsx";
import { ResultCard } from "../ResultCard/ResultCard.tsx";
import { ResultsProps } from "./types.ts";

export const ResultsMobile = (
  { event, flights, accommodation, currency }: ResultsProps,
) => (
  <Carousel className="h-[50vh] block bg-white w-full sm:hidden">
    <ResultCard
      name="Party"
      redirectUrl={event?.url}
      icon="/tickets.svg"
      price={event?.price}
      currency={currency}
    />
    <ResultCard
      name="Flight"
      redirectUrl={flights?.url}
      icon="/flight.svg"
      iconStyles="animate-fly"
      price={flights?.price}
      currency={currency}
    />
    <ResultCard
      name="Rest"
      redirectUrl={accommodation?.url}
      icon="/house.svg"
      price={accommodation?.price}
      currency={currency}
    />
  </Carousel>
);
