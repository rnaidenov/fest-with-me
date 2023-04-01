import { useContext } from "preact/hooks";
import { CurrencyCode } from "../types.ts";
import { CurrencySymbol } from "../consts.ts";
import { CurrencyContext } from "../context/CurrencyContext.ts";

export default () => {
  const currency = CurrencyContext.currency;

  const handleCurrencyChange = (update: CurrencyCode) => {
    console.log(
      "🚀 ~ file: Footer.tsx:10 ~ handleCurrencyChange ~ update:",
      update,
    );
    CurrencyContext.changeCurrency(update);
  };

  return (
    <div className="absolute bg-black flex bottom-0 w-full h-12 justify-center md:justify-between md:pl-12">
      <div className="grid grid-cols-3 place-items-center text-lg gap-x-12 md:gap-x-8">
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
          <p className="inline-block text-white">| Powered by:</p>
        </div>
        <div className="grid grid-cols-3 place-items-center scale-75 -ml-6">
          <img src="/ra.svg" alt="Resident Advisor" />
          <img src="/kiwi.svg" alt="Kiwi.com" />
          <img src="airbnb.svg" alt="AirBnb" />
        </div>
      </div>
    </div>
  );
};
