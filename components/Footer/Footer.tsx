import { CurrencyCode } from "../../types.ts";

export const Footer = () => {
  const currency = "GBP";

  const handleCurrencyChange = () => {};

  const changeCurrency = async (
    from: CurrencyCode,
    to: CurrencyCode,
    amounts: number[],
  ) => {
    if (from === to) {
      return;
    }

    return await fetch("/api/currency", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        amounts,
      }),
    }).then((res) => res.json());
  };

  // TODO: Optimise - cache.
  // TODO: Save last currency preference
  // Context / provider
  // const handleCurrencyChange = async (e) => {
  //   const from = currency;
  //   const to = e.target.dataset.currency;

  //   const converted = await changeCurrency(
  //     from,
  //     to,
  //     [eventData.price, flightsData.price, accommodationData.price],
  //   );

  //   setCurrency(to);

  //   const [event, flights, accommodation] = [
  //     eventData,
  //     flightsData,
  //     accommodationData,
  //   ].map((data, idx) => ({
  //     ...data,
  //     price: converted[idx],
  //     url: data.url.replace(from, to),
  //   }));

  //   setEventData(event);
  //   setFlightsData(flights);
  //   setAccommodationData(accommodation);
  // };

  return (
    <div className="absolute bg-black flex bottom-0 w-full h-12 justify-center md:justify-between md:pl-12">
      <div className="grid grid-cols-3 place-items-center text-lg gap-x-12 md:gap-x-8">
        <p
          className={`transition-opacity duration-300 hover:cursor-pointer text-white opacity-${
            currency === CurrencyCode.GBP ? 100 : 60
          }`}
          data-currency={CurrencyCode.GBP}
          onClick={handleCurrencyChange}
        >
          £
        </p>
        <p
          className={`transition-opacity duration-300 hover:cursor-pointer text-white opacity-${
            currency === CurrencyCode.USD ? 100 : 60
          }`}
          data-currency={CurrencyCode.USD}
          onClick={handleCurrencyChange}
        >
          $
        </p>
        <p
          className={`transition-opacity duration-300 hover:cursor-pointer text-white opacity-${
            currency === CurrencyCode.EUR ? 100 : 60
          }`}
          data-currency={CurrencyCode.EUR}
          onClick={handleCurrencyChange}
        >
          €
        </p>
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
