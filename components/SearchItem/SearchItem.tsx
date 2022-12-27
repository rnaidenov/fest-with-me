import Preact from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
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
  const [customPrice, setCustomPrice] = useState("");
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [canDiscardCustomPrice, setCanDiscardCustomPrice] = useState(true);
  const [showDiscardCustomPrice, setShowDiscardCustomPrice] = useState(true);
  const [hasPriceChangeOccured, setHasPriceChangeOccured] = useState(false);

  const isFirstRender = useFirstRender();

  const customPriceInput = useRef(null);

  const handlePriceChange = (e) => {
    e.stopPropagation();
    if (isEditingPrice) {
      return;
    }

    setIsEditingPrice(true);
  };

  const handlePriceInputChange = (e) => {
    const value = e.target.value;
    if (typeof Number(value) !== "number") {
      return;
    }
    setCustomPrice(value);
  };

  const handleDiscardCustomPrice = () => {
    setCustomPrice("");
    setIsEditingPrice(false);
  };

  useEffect(() => {
    if (isEditingPrice) {
      customPriceInput.current.focus();
    }
  }, [isEditingPrice]);

  useEffect(() => {
    if (!canDiscardCustomPrice) {
      setTimeout(() => {
        setShowDiscardCustomPrice(false);
      }, 500);
    }
  }, [canDiscardCustomPrice]);

  useEffect(() => {
    if (showDiscardCustomPrice) {
      setTimeout(() => {
        setCanDiscardCustomPrice(true);
      });
    }
  }, [showDiscardCustomPrice]);

  console.log(customPrice);

  // TODO: usePriceChangeOccurence
  useEffect(() => {
    if (isFirstRender === false && customPrice === "") {
      setHasPriceChangeOccured(true);
    }

    return () => {
      setTimeout(() => {
        setHasPriceChangeOccured(false);
      }, 750);
    };
  }, [currency, customPrice]);

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
      <p
        className={`text-2xl${
          hasPriceChangeOccured ? " animate-fade-in" : ""
        } hover:cursor-text`}
        onClick={handlePriceChange}
      >
        {CURRENCY_CODE_TO_SYMBOL_MAP[currency]}
        {isEditingPrice
          ? (
            <div className="inline-flex items-center">
              <input
                ref={customPriceInput}
                value={customPrice}
                onInput={handlePriceInputChange}
                onFocus={() => setShowDiscardCustomPrice(true)}
                onBlur={() => setCanDiscardCustomPrice(false)}
                className={`w-[${String(customPrice).length}ch]`}
              />
              <img
                src="/remove.svg"
                alt="Remove"
                onClick={handleDiscardCustomPrice}
                className={`${
                  showDiscardCustomPrice ? "inline-block" : "hidden"
                }
                  ${
                  customPrice === "" || !canDiscardCustomPrice
                    ? "opacity-0"
                    : "opacity-60"
                } ml-4 transition-opacity duration-1000 hover:cursor-pointer`}
              />
            </div>
          )
          : price}
      </p>
    </div>
  );
};
