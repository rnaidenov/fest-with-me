import Preact from "preact";
import { AccommodationData } from "../../types.ts";

type BaseResultCardProps = {
  name: string;
  price: number | undefined;
  redirectUrl: string | undefined;
  icon: Preact.PreactNode;
  className?: string;
  style?: Record<string, unknown>;
  iconStyles?: string;
  info?: string;
  showCardInfo: boolean;
  onPriceUpdate: (price: number) => void;
};

export type ResultCardProps =
  | BaseResultCardProps
  | Omit<BaseResultCardProps, "price"> & {
    price: AccommodationData["price"] | undefined;
  };
