import { useContext } from "preact/hooks";
import { CurrencyCode } from "../types.ts";
import { CurrencySymbol } from "../consts.ts";
import { CurrencyContext } from "../context/CurrencyContext.ts";

export default () => {
  const currency = CurrencyContext.currency;

  const handleCurrencyChange = (update: CurrencyCode) => {
    CurrencyContext.changeCurrency(update);
  };

  const anchorClass = "hover:scale-105 transition-transform duration-500";

  return (
    <div className="absolute bg-black flex bottom-0 w-full h-12 justify-center md:justify-between md:pl-12 font-teko overflow-hidden">
      <div className="grid grid-cols-3 place-items-center gap-x-12 md:gap-x-8">
        {[CurrencyCode.GBP, CurrencyCode.USD, CurrencyCode.EUR].map((
          currencyOption,
        ) => (
          <p
            className={`transition-opacity duration-300 hover:cursor-pointer text-white opacity-${
              currencyOption === currency.value.active ? 100 : 60
            }`}
            onClick={() => handleCurrencyChange(currencyOption)}
          >
            {CurrencySymbol[currencyOption]}
          </p>
        ))}
      </div>
      <div className="items-center justify-end w-full hidden md:flex">
        <div className="flex items-center uppercase text-sm">
          <span className="bg-white inline-block h-6 w-[2px] mr-1" />
          <p className="inline-block text-white text-sm">| Powered by:</p>
        </div>
        <div className="grid grid-cols-3 place-items-center scale-75 -ml-6">
          <a
            href="https://ra.co/"
            target="_blank"
            className={anchorClass}
          >
            <img src="/ra.svg" alt="Resident Advisor" />
          </a>
          <a
            href="https://www.kiwi.com/en/"
            target="_blank"
            className={anchorClass}
          >
            <img src="/kiwi.svg" alt="Kiwi.com" />
          </a>
          <a
            href="https://www.airbnb.com/"
            target="_blank"
            className={anchorClass}
          >
            <img src="airbnb.svg" alt="AirBnb" />
          </a>
        </div>
      </div>
    </div>
  );
};
