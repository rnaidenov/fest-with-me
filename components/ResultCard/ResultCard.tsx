import { useEffect, useRef, useState } from "preact/hooks";
import { CurrencySymbol } from "../../consts.ts";
import { CurrencyCode } from "../../types.ts";
import { CurrencyContext } from "../../context/CurrencyContext.ts";
import { useFirstRender } from "../../utils/fe/hooks/use-first-render.ts";

import { ResultCardProps } from "./types.ts";

// TODO: withClass fn
// class to be optional!
// {' ' + className ?? ''}`
export const ResultCard = (props: ResultCardProps) => {
  const {
    name,
    price,
    redirectUrl,
    icon,
    iconStyles,
    onPriceUpdate,
    className,
  } = props;

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [canDiscardCustomPrice, setCanDiscardCustomPrice] = useState(true);
  const [showDiscardCustomPrice, setShowDiscardCustomPrice] = useState(true);
  const [hasPriceChanged, setHasPriceChanged] = useState(false);
  const [hasCurrencyChanged, setHasCurrencyChanged] = useState(false);

  const currency = CurrencyContext.currency.value;

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

    if (isNaN(Number(value))) {
      return;
    }

    onPriceUpdate(value);
  };

  const handleDiscardCustomPrice = () => {
    setIsEditingPrice(false);
  };

  useEffect(() => {
    if (isEditingPrice) {
      customPriceInput.current.focus();
    }
  }, [isEditingPrice]);

  // TODO: Make icon bigger
  useEffect(() => {
    if (!canDiscardCustomPrice) {
      setTimeout(() => {
        setShowDiscardCustomPrice(false);
        // TODO: Const.
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

  useEffect(() => {
    if (isFirstRender === false) {
      setHasPriceChanged(true);
    }

    return () => {
      setTimeout(() => {
        setHasPriceChanged(false);
        setHasCurrencyChanged(false);
        // TODO: Const
      }, 750);
    };
  }, [price]);

  useEffect(() => {
    if (
      currency.prev !== null && currency.prev !== currency.active && price !== 0
    ) {
      setHasCurrencyChanged(true);
    }
  }, [currency]);

  return (
    <div
      {...props}
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
          hasPriceChanged ? " animate-fade-in" : ""
        } hover:cursor-text`}
        onClick={handlePriceChange}
      >
        {CurrencySymbol[currency.active]}
        {(isEditingPrice || price === null)
          ? (
            <div className="inline-flex items-center">
              <input
                ref={customPriceInput}
                value={price}
                onInput={handlePriceInputChange}
                onFocus={() => setShowDiscardCustomPrice(true)}
                onBlur={() => setCanDiscardCustomPrice(false)}
                className={`w-[${String(price).length}ch]`}
              />
              <img
                src="/remove.svg"
                alt="Remove"
                onClick={handleDiscardCustomPrice}
                className={`${
                  showDiscardCustomPrice ? "inline-block" : "hidden"
                }
                  ${
                  price === "" || !canDiscardCustomPrice
                    ? "opacity-0"
                    : "opacity-60"
                } ml-4 transition-opacity duration-1000 hover:cursor-pointer`}
              />
            </div>
          )
          : (
            <span className={hasCurrencyChanged ? "animate-pulse" : null}>
              {price}
            </span>
          )}
      </p>
    </div>
  );
};
