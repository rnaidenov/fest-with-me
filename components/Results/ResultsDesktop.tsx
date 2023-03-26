import { useEffect, useState } from "preact/hooks";
import { CurrencySymbol } from "../../consts.ts";
import { ResultCard } from "../ResultCard/ResultCard.tsx";
import { ResultsProps } from "./types.ts";

export const ResultsDesktop = (
  { event, flights, accommodation, currency, onPriceUpdate }: ResultsProps,
) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotal = [event?.price, flights?.price, accommodation?.price]
      .reduce(
        (acc, val) => acc! + val!,
        0,
      );

    setTotalPrice(newTotal);
  }, [event?.price, flights?.price, accommodation?.price]);

  return (
    <div className="flex flex-wrap justify-around">
      <h3 className="w-full text-center mb-4">
        Total price is {CurrencySymbol[currency]}
        {totalPrice} {event?.price === 0 ? "(excl. event ticket)" : ""}
      </h3>
      <ResultCard
        name="Party"
        redirectUrl={event?.url}
        icon="/tickets.svg"
        className="h-64 w-72 animate-in-from-left"
        price={event?.price}
        currency={currency}
        onPriceUpdate={onPriceUpdate("event")}
      />
      <ResultCard
        name="Flight"
        redirectUrl={flights?.url}
        icon="/flight.svg"
        iconStyles="animate-fly"
        className="h-64 w-72 animate-in-from-left delay-500"
        price={flights?.price}
        currency={currency}
        onPriceUpdate={onPriceUpdate("flights")}
      />
      <ResultCard
        name="Rest"
        redirectUrl={accommodation?.url}
        icon="/house.svg"
        // TODO: Repetition
        className="h-64 w-72 animate-in-from-left"
        price={accommodation?.price}
        currency={currency}
        onPriceUpdate={onPriceUpdate("accommodation")}
      />
    </div>
  );
};
