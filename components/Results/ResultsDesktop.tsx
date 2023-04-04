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
  const [showEmptyPriceDemo, setShowEmptyPriceDemo] = useState(false);

  const [excludingLabel, setExcludingLabel] = useState("");

  const labelUpdateOnPriceChange = (
    missingPrices: { key: string; value: number | undefined }[],
  ) => {
    if (missingPrices.length === 0) {
      setExcludingLabel("");
      return;
    }

    const label = missingPrices.reduce(
      (acc, part, idx, arr) =>
        acc.length === 0 ? ` (excl. the ${part.key}` : `${acc}, ${part.key}`,
      "",
    );
    setExcludingLabel(label);
  };

  const currency: CurrencyCode = CurrencyContext.currency.value.active;

  useEffect(() => {
    const prices = [
      { key: "event", value: event?.price },
      { key: "flights", value: flights?.price },
      { key: "accommodation", value: accommodation?.price },
    ];

    const newTotal = prices.reduce(
      (acc, price) => acc! + price.value!,
      0,
    );

    const missingPrices = prices.filter((price) =>
      typeof price.value !== "number" || price.value === 0
    );

    labelUpdateOnPriceChange(missingPrices);
    setTotalPrice(newTotal);
  }, [event?.price, flights?.price, accommodation?.price]);

  return (
    <div className="flex flex-wrap justify-around">
      <h3 className="font-oswald w-full text-center text-forest my-6">
        Total price is {CurrencySymbol[currency]}
        {totalPrice} {excludingLabel}{"  "}{excludingLabel &&
          (
            <>
              <img
                className="scale-90 inline-block hover:cursor-pointer"
                src="/info.svg"
                alt="Icon"
                onMouseOver={() => setShowEmptyPriceDemo(true)}
                onMouseOut={() => setShowEmptyPriceDemo(false)}
              />
              {")"}
            </>
          )}
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
          emptyPriceDemo={showEmptyPriceDemo &&
            excludingLabel.includes(priceKey)}
          style={{ animationDelay: `${(arr.length - idx) * 350}ms` }}
          onPriceUpdate={onPriceUpdate(priceKey)}
        />
      ))}
    </div>
  );
};
