import { useEffect, useRef, useState } from "preact/hooks";
import { CurrencySymbol } from "../../consts.ts";
import { CurrencyContext } from "../../context/CurrencyContext.ts";
import { useFirstRender } from "../../utils/fe/hooks/use-first-render.ts";
import { ResultCardProps } from "./types.ts";
import { UPDATE_ANIMATION_DURATION_MILLISECONDS } from "./consts.ts";
import { ResultPrice } from "./ResultPrice.tsx";
import { withClass } from "../../utils/fe/with-class.ts";

// TODO: REFACTOR!
export const ResultCard = (props: ResultCardProps) => {
  const {
    name,
    price,
    redirectUrl,
    icon,
    iconStyles,
    onPriceUpdate,
    className,
    showCardInfo,
    info,
  } = props;

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [canDiscardCustomPrice, setCanDiscardCustomPrice] = useState(true);
  const [showDiscardCustomPrice, setShowDiscardCustomPrice] = useState(true);
  const [hasPriceChanged, setHasPriceChanged] = useState(false);
  const [hasCurrencyChanged, setHasCurrencyChanged] = useState(false);

  const [showManualPriceDemo, setShowManualPriceDemo] = useState(false);

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

  useEffect(() => {
    if (isEditingPrice) {
      customPriceInput.current.focus();
    }
  }, [isEditingPrice]);

  useEffect(() => {
    // sci = 0
    if (!isFirstRender && !showCardInfo) {
      // mpd = 1
      setShowManualPriceDemo(true);

      // mpd = 0
      setTimeout(() => {
        setShowManualPriceDemo(false);
      }, 2 * UPDATE_ANIMATION_DURATION_MILLISECONDS);
    }
  }, [showCardInfo, showManualPriceDemo]);

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
      withClass
      className={withClass(
        "relative bg-white  inline-flex  flex-col  justify-around  shadow-4xl  items-center rounded-[2.5rem]  hover:cursor-pointer  hover:scale-[1.025] hover:rounded-3xl  transition-all duration-300",
        className,
      )}
      href={redirectUrl}
      target="_blank"
    >
      {showCardInfo && info && (
        // TODO:
        <div className="absolute flex flex-col animate-fill-height justify-start items-center p-4 z-10 top-0 left-0 w-full h-full bg-forest text-white text-center rounded-[2.5rem]">
          <div className="flex flex-col items-center uppercase w-full animate-fade-in">
            <p className="text-sm">The</p>
            <p className="text-lg">{name}</p>
          </div>
          <p
            className="font-teko animate-flicker w-full mt-8"
            style={{
              animationDelay: `${
                2 / 3 * UPDATE_ANIMATION_DURATION_MILLISECONDS
              }ms`,
            }}
          >
            {info}
          </p>
        </div>
      )}
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
                onClick={() => setIsEditingPrice(false)}
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
              emptyPriceDemo={showManualPriceDemo}
              seekAttention={hasCurrencyChanged || showManualPriceDemo}
            />
          )}
      </p>
    </a>
  );
};
