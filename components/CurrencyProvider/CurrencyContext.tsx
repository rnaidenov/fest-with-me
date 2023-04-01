import { createContext } from "preact";
import { Context } from "preact/hooks";
import { CurrencyCode } from "../../types.ts";
import { CurrencyContextType } from "./types.ts";

export const CurrencyContext: Context<CurrencyContextType> = createContext({
  prev: CurrencyCode.USD,
  active: CurrencyCode.USD,
});
