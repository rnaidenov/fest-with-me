import Preact from "preact";
import { AccommodationData, CurrencyCode } from "../../types.ts";

type BaseResultCardProps = {
  name: string;
  price: number | undefined;
  redirectUrl: string | undefined;
  icon: Preact.PreactNode;
  className?: string;
  iconStyles?: string;
  currency: CurrencyCode;
  onPriceUpdate: (price: number) => void;
};

export type ResultCardProps =
  | BaseResultCardProps
  | Omit<BaseResultCardProps, "price"> & {
    price: AccommodationData["price"] | undefined;
  };
