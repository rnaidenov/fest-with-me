import { useEffect, useState } from "preact/hooks";
import { CurrencySymbol } from "../../consts.ts";
import { CurrencyContext } from "../../context/CurrencyContext.ts";
import { CurrencyCode } from "../../types.ts";
import { ResultCard } from "../ResultCard/ResultCard.tsx";
import { ResultCardData, ResultsProps } from "./types.ts";

export const ResultsDesktop = (
  { event, flights, accommodation, onPriceUpdate }: ResultsProps,
) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const currency: CurrencyCode = CurrencyContext.currency.value.active;

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
      <h3 className="font-oswald w-full text-center my-6">
        Total price is {CurrencySymbol[currency]}
        {totalPrice} {event?.price === 0 ? "(excl. event ticket)" : ""}
      </h3>
      {[
        {
          name: "Party",
          redirectUrl: event?.url,
          icon: "/tickets.svg",
          price: event?.price,
          priceKey: "event",
        },
        {
          name: "Flight",
          redirectUrl: flights?.url,
          icon: "/flight.svg",
          iconStyles: "animate-fly",
          price: flights?.price,
          priceKey: "flights",
        },
        {
          name: "Rest",
          redirectUrl: accommodation?.url,
          icon: "/house.svg",
          price: accommodation?.price,
          priceKey: "accommodation",
        },
      ].map(({ priceKey, iconStyles, ...props }: ResultCardData, idx, arr) => (
        <ResultCard
          {...props}
          iconStyles={iconStyles ?? ""}
          className="h-64 w-72 animate-in-from-left"
          style={{ animationDelay: `${(arr.length - idx) * 350}ms` }}
          onPriceUpdate={onPriceUpdate(priceKey)}
        />
      ))}
    </div>
  );
};
