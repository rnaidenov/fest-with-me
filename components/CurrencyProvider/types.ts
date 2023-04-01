import { CurrencyCode } from "../../types.ts";

export type CurrencyChange = {
  prev: CurrencyCode;
  active: CurrencyCode;
};

export type CurrencyContextType = {
  currency: CurrencyChange;
  changeCurrency: (currency: CurrencyCode) => void;
};
