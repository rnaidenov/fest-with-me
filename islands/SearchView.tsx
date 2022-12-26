import { useEffect, useRef, useState } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import { Box, Carousel, SearchItem, TextField } from "@components";
import { CurrencyCode, QueryKey } from "../types.ts";
import EventAutocomplete from "../islands/EventAutocomplete.tsx";
import { searchFlights } from "../utils/fe/search-flights.ts";
import { searchAccommodation } from "../utils/fe/search-accommodation.ts";
import PeopleCounter from "./PeopleCounter.tsx";
import NightsCounter from "./NightsCounter.tsx";

// TODO: Fix button active state
// TODO: Events on the same date
// TODO: Events in the past
// TODO: Events for which no flights
enum SearchStatus {
  SearchNotStarted = 0,
  SearchStarted = 1,
  SearchEnded = 2,
}

export default function SearchView(props: PageProps) {
  const searchWrapRef = useRef();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(
    SearchStatus.SearchNotStarted,
  );

  const [currency, setCurrency] = useState<CurrencyCode>(CurrencyCode.GBP);
  const [eventData, setEventData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);
  const [accommodationData, setAccommodationData] = useState(null);
  // TODO: Event name and metadata!
  const [searchQuery, setSearchQuery] = useState({
    [QueryKey.Origin]: "Sofia",
    [QueryKey.NumPeople]: 1,
    [QueryKey.EventName]: "",
  });

  const handleClick = async (e) => {
    setSearchStatus(SearchStatus.SearchStarted);

    const flightsData = await searchFlights({
      ...searchQuery,
      destinationCity: searchQuery.destinationGeneral,
      currency,
    });
    setFlightsData(flightsData);

    const accommodationData = await searchAccommodation({
      currency,
      eventDate: searchQuery.eventDate,
      numPeople: searchQuery.numPeople,
      city: searchQuery.destinationSpecific,
      dateTo: flightsData?.outboundDate,
      dateFrom: flightsData?.inboundDate,
      country: searchQuery.destinationCountry,
    });

    setAccommodationData(accommodationData);
    setSearchStatus(SearchStatus.SearchEnded);
  };

  // TODO: Optimise - cache.
  // TODO: Save last currency preference
  const handleCurrencyChange = async (e) => {
    const currencyFrom = currency;
    const currencyTo = e.target.dataset.currency;

    if (currencyFrom === currencyTo) {
      return;
    }

    // const ticketPrice = eventData.price;
    const flightsPrice = flightsData.price;
    const accommodationPrice = accommodationData.price;

    const converted = await fetch("/api/currency", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: currencyFrom,
        to: currencyTo,
        amounts: [flightsPrice, accommodationPrice],
      }),
    }).then((res) => res.json());

    setCurrency(currencyTo);

    // TODO:
    // setAirbnbData - change url
    // setFlightsData - change url
    setEventData((eventData) => ({ ...eventData, price: converted[0] }));
    setFlightsData((flightsData) => ({
      ...flightsData,
      price: converted[1],
      url: flightsData.url.replace(currencyFrom, currencyTo),
    }));
    setAccommodationData((accommodationData) => ({
      ...accommodationData,
      price: converted[2],
      url: accommodationData.url.replace(currencyFrom, currencyTo),
    }));
  };

  const handleEventChange = (eventName: string, eventMetadataJSON: string) => {
    if (eventMetadataJSON === undefined) {
      return;
    }

    const eventMetadata = JSON.parse(eventMetadataJSON);

    // TODO: types
    setEventData({
      name: eventName,
      url: eventMetadata.url,
      price: 0,
    });

    // TODO: Fix any type
    // TODO: Helpers
    const normalizeEventQuery = (
      eventName: string,
      eventMetadataJSON: any,
    ) => ({
      [QueryKey.EventName]: eventName,
      destinationGeneral: eventMetadataJSON.areaName,
      destinationSpecific: eventMetadataJSON.clubName,
      [QueryKey.DestinationCountry]: eventMetadataJSON.country,
      [QueryKey.EventDate]: eventMetadataJSON.date,
    });

    setSearchQuery((searchQuery) => ({
      ...searchQuery,
      ...normalizeEventQuery(eventName, eventMetadata),
    }));
  };

  const handleCommonChange = ({ target }) => {
    setSearchQuery((searchQuery) => ({
      ...searchQuery,
      [target.dataset.name]: target.value,
    }));
  };

  return (
    <>
      <div
        className="relative w-full md:mx-auto md:w-10/12 xl:w-9/12"
        ref={searchWrapRef}
      >
        <div className="flex flex-col h-[50vh] items-center text-white justify-center h-10/12 md:pb-0 md:flex-row md:justify-around md:pt-48">
          <PeopleCounter />
          <p className="mx-2 my-2 md:my-0">
            going to
          </p>
          <EventAutocomplete
            className="w-11/12 min-h-[40px] md:w-80"
            data-name={QueryKey.EventName}
            value={searchQuery.eventName}
            onChange={handleEventChange}
          />
          <p className="mx-2 my-2 md:my-0">
            from
          </p>
          <TextField
            className="w-11/12 min-h-[40px] md:w-48"
            type="text"
            data-name={QueryKey.Origin}
            value={searchQuery.origin}
            onChange={handleCommonChange}
          />
          <p className="mx-2 my-2 md:my-0">
            for up to
          </p>
          <NightsCounter />

          <button
            className="flex items-center justify-center absolute w-12 h-12 -bottom-7 rounded-full bg-eggplant shadow-3xl z-30"
            onClick={handleClick}
          >
            <img
              src="/search.svg"
              alt="Search magnifying glass"
              className="scale-75"
            />
          </button>
        </div>
      </div>

      <div
        className={`${
          searchStatus === SearchStatus.SearchEnded ? "block" : "hidden"
        } h-full`}
      >
        <div className="h-1/2 justify-around items-center hidden sm:flex animate-in-from-left">
          <SearchItem
            name="Party"
            redirectUrl={eventData?.url}
            icon="/tickets.svg"
            className="h-64 w-72"
            price={eventData?.price}
            currency={currency}
          />
          <SearchItem
            name="Flight"
            redirectUrl={flightsData?.url}
            icon="/flight.svg"
            iconStyles="animate-fly"
            className="h-64 w-72"
            price={flightsData?.price}
            currency={currency}
          />
          <SearchItem
            name="Rest"
            redirectUrl={accommodationData?.url}
            icon="/house.svg"
            // TODO: Repetition
            className="h-64 w-72"
            price={accommodationData?.price}
            currency={currency}
          />
        </div>

        <Carousel className="h-[50vh] block bg-white w-full sm:hidden">
          <SearchItem
            name="Party"
            redirectUrl={eventData?.url}
            icon="/tickets.svg"
            price={eventData?.price}
            currency={currency}
          />
          <SearchItem
            name="Flight"
            redirectUrl={flightsData?.url}
            icon="/flight.svg"
            iconStyles="animate-fly"
            price={flightsData?.price}
            currency={currency}
          />
          <SearchItem
            name="Rest"
            redirectUrl={accommodationData?.url}
            icon="/house.svg"
            price={accommodationData?.price}
            currency={currency}
          />
        </Carousel>
      </div>

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
    </>
  );
}
