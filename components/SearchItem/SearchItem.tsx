import Preact from "preact";

import { Box } from "../Box.tsx";

// TODO: types
interface SearchItemProps {
  name: string;
  price: number;
  redirectUrl: string;
  icon: Preact.PreactNode;
  className: string;
}

// TODO: withClass fn
// class to be optional!
// {' ' + className ?? ''}`
export const SearchItem = (
  { name, price, redirectUrl, icon, iconStyles, className },
) => (
  <div
    className={`bg-white inline-flex flex-col justify-around shadow-2xl items-center rounded-2xl hover:cursor-pointer${
      " " + className ?? ""
    }`}
    onClick={() => window.open(redirectUrl, "_blank")}
  >
    <div className="flex flex-col items-center uppercase">
      <p className="text-sm">The</p>
      <p className="text-2xl">{name}</p>
    </div>
    <img className={`h-20 w-20${" " + iconStyles ?? ""}`} src={icon} />
    <p className="text-2xl">{price}</p>
  </div>
);
