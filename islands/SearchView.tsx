import { useEffect, useRef, useState } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import { Box, Carousel, SearchItem, TextField } from "@components";
import { QueryKey } from "../types.ts";
import EventAutocomplete from "../islands/EventAutocomplete.tsx";
import { searchFlights } from "../utils/fe/search-flights.ts";
import { searchAccommodation } from "../utils/fe/search-accommodation.ts";
import PeopleCounter from "./PeopleCounter.tsx";
import NightsCounter from "./NightsCounter.tsx";

export default function SearchView(props: PageProps) {
  const searchWrapRef = useRef();
  const [isSearching, setIsSearching] = useState(false);

  const [currency, setCurrency] = useState("GBP");
  const [flightsData, setFlightsData] = useState(null);
  const [accommodationData, setAccommodationData] = useState(null);
  // TODO: Event name and metadata!
  const [query, setQuery] = useState({
    [QueryKey.Origin]: "",
    [QueryKey.NumPeople]: "",
    [QueryKey.EventName]: "",
  });

  const handleClick = async (e) => {
    setIsSearching(true);

    const flightsData = await searchFlights({ ...query, currency });
    setFlightsData(flightsData);

    const accommodationData = await searchAccommodation({
      currency,
      eventDate: query.eventDate,
      numPeople: query.numPeople,
      city: query.destinationCity,
      dateTo: flightsData?.outboundDate,
      dateFrom: flightsData?.inboundDate,
      country: query.destinationCountry,
    });

    setAccommodationData(accommodationData);
    setIsSearching(false);
  };

  const handleEventChange = (eventName: string, eventMetadataJSON: string) => {
    const eventMetadata = JSON.parse(eventMetadataJSON);

    // TODO: Fix any type
    const normalizeEventQuery = (
      eventName: string,
      eventMetadataJSON: any,
    ) => ({
      [QueryKey.EventName]: eventName,
      [QueryKey.DestinationCity]: eventMetadataJSON.city,
      [QueryKey.DestinationCountry]: eventMetadataJSON.country,
      [QueryKey.EventDate]: eventMetadataJSON.date,
    });

    setQuery((query) => ({
      ...query,
      ...normalizeEventQuery(eventName, eventMetadata),
    }));
  };

  const handleCommonChange = ({ target }) => {
    setQuery((query) => ({ ...query, [target.dataset.name]: target.value }));
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
            value={query.eventName}
            onChange={handleEventChange}
          />
          <p className="mx-2 my-2 md:my-0">
            from
          </p>
          <TextField
            className="w-11/12 min-h-[40px] md:w-48"
            type="text"
            data-name={QueryKey.Origin}
            value={query.origin}
            onChange={handleCommonChange}
          />
          <p className="mx-2 my-2 md:my-0">
            for up to
          </p>
          <NightsCounter />

          <button
            className="flex items-center justify-center absolute w-14 h-14 -bottom-7 rounded-full bg-eggplant shadow-2xl shadow-[#50d71e] z-50"
            onClick={handleClick}
          >
            <img src="/search.svg" alt="Search magnifying glass" />
          </button>
        </div>
      </div>

      {
        /*
        <TextField
          type="number"
          data-name={QueryKey.NumPeople}
          value={query.numPeople}
          onChange={handleCommonChange}
        />


        <br />
        <b>Flights:</b>
        <br />
        {flightsData ? JSON.stringify(flightsData) : isSearching ? "🤔💭" : "💩"}
        <br />
        <b>Airbnb:</b>
        <br />

        {accommodationData
          ? JSON.stringify(accommodationData)
          : isSearching
          ? "🤨🧐🤨"
          : "💩"}
        <br />
        <br /> */
      }
      <div className="h-1/2 justify-around items-center hidden sm:flex">
        <SearchItem
          name="Party"
          redirectUrl="https://ra.co/events/1582415"
          icon="/tickets.svg"
          className="h-64 w-72"
          price={42}
        />
        <SearchItem
          name="Flight"
          redirectUrl="https://ra.co/events/1582415"
          icon="/flight.svg"
          iconStyles="animate-fly"
          className="h-64 w-72"
          price={69}
        />
        <SearchItem
          name="Rest"
          redirectUrl="https://ra.co/events/1582415"
          icon="/house.svg"
          // TODO: Repetition
          className="h-64 w-72"
          price={100}
        />
      </div>

      <Carousel className="h-[50vh] block bg-white w-full sm:hidden">
        <SearchItem
          name="Party"
          redirectUrl="https://ra.co/events/1582415"
          icon="/tickets.svg"
          price={42}
        />
        <SearchItem
          name="Flight"
          redirectUrl="https://ra.co/events/1582415"
          icon="/flight.svg"
          iconStyles="animate-fly"
          price={69}
        />
        <SearchItem
          name="Rest"
          redirectUrl="https://ra.co/events/1582415"
          icon="/house.svg"
          price={100}
        />
      </Carousel>
    </>
  );
}
