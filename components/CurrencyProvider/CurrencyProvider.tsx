import { useState } from "preact/hooks";
import { CurrencyCode, FCWithChildren } from "../../types.ts";
import { CurrencyContext } from "./CurrencyContext.tsx";
import { CurrencyChange } from "./types.ts";

// This needs to be an island so it can rehydrate
// but islands cannot have children as props
// => a bit of a deadlock situation
export const CurrencyProvider: FCWithChildren = (
  { children }: FCWithChildren,
) => {
  const [currency, setCurrency] = useState<CurrencyChange>({
    prev: CurrencyCode.USD,
    active: CurrencyCode.GBP,
  });

  const changeCurrency = (currency: CurrencyChange) => {
    setCurrency(currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        changeCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
