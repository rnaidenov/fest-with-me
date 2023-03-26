import { ResultCard } from "../ResultCard/ResultCard.tsx";
import { ResultsProps } from "./types.ts";

export const ResultsDesktop = ({
  event,
  flights,
  accommodation,
  currency,
}: ResultsProps) => (
  <>
    <ResultCard
      name="Party"
      redirectUrl={event?.url}
      icon="/tickets.svg"
      className="h-64 w-72 animate-in-from-left"
      price={event?.price}
      currency={currency}
    />
    <ResultCard
      name="Flight"
      redirectUrl={flights?.url}
      icon="/flight.svg"
      iconStyles="animate-fly"
      className="h-64 w-72 animate-in-from-left delay-500"
      price={flights?.price}
      currency={currency}
    />
    <ResultCard
      name="Rest"
      redirectUrl={accommodation?.url}
      icon="/house.svg"
      // TODO: Repetition
      className="h-64 w-72 animate-in-from-left"
      price={accommodation?.price}
      currency={currency}
    />
  </>
);
