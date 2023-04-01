import { Signal } from "@preact/signals";
import { CurrencyCode } from "../types.ts";

export type CurrencyChange = {
  prev: CurrencyCode;
  active: CurrencyCode;
};

export interface ICurrencyContext {
  currency: Signal<CurrencyChange>;
  changeCurrency: (currency: CurrencyCode) => void;
}
