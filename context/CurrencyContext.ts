import { signal } from "@preact/signals";
import { CurrencyCode, Maybe } from "../types.ts";
import { LS_ACTIVE_CURRENCY_KEY } from "./consts.ts";
import { ICurrencyContext } from "./types.ts";

export type Theme = "light" | "dark";
export type Language = "english" | "norsk";

const currency = signal({ prev: null, active: null });

const changeCurrency = (update: CurrencyCode) => {
  currency.value = { prev: currency.value.active, active: update };
  // localStorage?.setItem(LS_ACTIVE_CURRENCY_KEY, update);
};

// const currencyPreference = localStorage?.getItem(
//   LS_ACTIVE_CURRENCY_KEY,
// ) as Maybe<CurrencyCode>;

addEventListener("load", () => {
  // changeCurrency(currencyPreference ?? CurrencyCode.GBP);
  changeCurrency(CurrencyCode.GBP);
});

export const CurrencyContext: ICurrencyContext = {
  currency,
  changeCurrency,
};
