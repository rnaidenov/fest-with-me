import { CurrencyCode } from "./types.ts";

export const CURRENCY_CODE_TO_SYMBOL_MAP = {
  [CurrencyCode.GBP]: "£",
  [CurrencyCode.USD]: "$",
  [CurrencyCode.EUR]: "€",
};

export const KIWI_DATE_FORMAT = "dd/M/yyyy";
export const AIRBNB_DATE_FORMAT = "yyyy-dd-M";
