import Preact from "preact";
import { useEffect, useState } from "preact/hooks";
import { CURRENCY_CODE_TO_SYMBOL_MAP } from "../../consts.ts";
import { useFirstRender } from "../../utils/fe/hooks/use-first-render.ts";

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
  { name, price, redirectUrl, icon, iconStyles, currency, className },
) => {
  const [hasCurrencyChanged, setHasCurrencyChanged] = useState(false);

  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (isFirstRender === false) {
      setHasCurrencyChanged(true);
    }

    return () => {
      setTimeout(() => {
        setHasCurrencyChanged(false);
      }, 750);
    };
  }, [currency]);

  return (
    <div
      className={`bg-white inline-flex flex-col justify-around shadow-4xl items-center rounded-2xl hover:cursor-pointer${
        " " + className ?? ""
      }`}
      onClick={() => window.open(redirectUrl, "_blank")}
    >
      <div className="flex flex-col items-center uppercase">
        <p className="text-sm">The</p>
        <p className="text-2xl">{name}</p>
      </div>
      <img className={`h-20 w-20${" " + iconStyles ?? ""}`} src={icon} />
      <p className={`text-2xl${hasCurrencyChanged ? " animate-fade-in" : ""}`}>
        {CURRENCY_CODE_TO_SYMBOL_MAP[currency]}
        {price}
      </p>
    </div>
  );
};
