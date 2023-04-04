import { useEffect, useRef, useState } from "preact/hooks";
import { CurrencySymbol } from "../../consts.ts";
import { CurrencyContext } from "../../context/CurrencyContext.ts";
import { useFirstRender } from "../../utils/fe/hooks/use-first-render.ts";
import { ResultCardProps } from "./types.ts";
import { UPDATE_ANIMATION_DURATION_MILLISECONDS } from "./consts.ts";
import { ResultPrice } from "./ResultPrice.tsx";

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
    emptyPriceDemo,
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
    e.preventDefault();

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
      }, 2 / 3 * UPDATE_ANIMATION_DURATION_MILLISECONDS);
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
      }, UPDATE_ANIMATION_DURATION_MILLISECONDS);
    };
  }, [price]);

  useEffect(() => {
    if (customPriceInput.current !== null) {
      customPriceInput.current.onblur = () => {
        setIsEditingPrice(false);
      };
    }
  }, [customPriceInput.current === null]);

  useEffect(() => {
    if (
      currency.prev !== null && currency.prev !== currency.active && price !== 0
    ) {
      setHasCurrencyChanged(true);
    }
  }, [currency]);

  return (
    <a
      {...props}
      // TODO: withClass
      className={`
        bg-white 
        inline-flex 
        flex-col 
        justify-around 
        shadow-4xl 
        items-center
        rounded-[2.5rem] 
        hover:cursor-pointer 
        hover:scale-[1.025]
        hover:rounded-3xl 
        transition-all
        duration-300
        ${" " + className ?? ""}
        `}
      href={redirectUrl}
      target="_blank"
    >
      <div className="flex flex-col items-center uppercase">
        <p className="text-sm">The</p>
        <p className="text-lg">{name}</p>
      </div>
      <img className={`h-20 w-20${" " + iconStyles ?? ""}`} src={icon} />
      <p
        className={`relative text-lg${
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
            <ResultPrice
              value={price}
              emptyPriceDemo={emptyPriceDemo}
              seekAttention={hasCurrencyChanged || emptyPriceDemo}
            />
            // TODO: withClass
          )}
      </p>
    </a>
  );
};
