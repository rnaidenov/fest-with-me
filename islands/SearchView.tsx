import { useEffect, useRef, useState } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import { Box, Carousel, ResultCard, Results, TextField } from "@components";
import {
  AccommodationData,
  CurrencyCode,
  EventData,
  FlightsData,
  SearchRef,
  SearchResults,
} from "../types.ts";
import EventAutocomplete from "../islands/EventAutocomplete.tsx";
import { accommodationQuery, flightsQuery } from "../utils/fe/index.ts";
import PeopleCounter from "./PeopleCounter.tsx";
import NightsCounter from "./NightsCounter.tsx";
import { Maybe, SearchStatus } from "../types.ts";

// TODO: Fix button active state
// TODO: Events on the same date
// TODO: Events in the past
// TODO: Events for which no flights

export default function SearchView(props: PageProps) {
  const searchWrapRef = useRef();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(
    // SearchStatus.SearchNotStarted,
    SearchStatus.End,
  );

  const [currency, setCurrency] = useState<CurrencyCode>(CurrencyCode.GBP);
  const [eventData, setEventData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);
  const [accommodationData, setAccommodationData] = useState(null);
  // const [eventData, setEventData] = useState({ price: 42 });
  // const [flightsData, setFlightsData] = useState({ price: 42 });
  // const [accommodationData, setAccommodationData] = useState({ price: 42 });
  // TODO: Event name and metadata!

  const [searchRef, setSearchRef] = useState<Maybe<SearchRef>>(null);
  const [results, setResults] = useState<Maybe<SearchResults>>(null);

  const handleClick = async (e) => {
    if (searchRef === null) {
      return;
    }

    setSearchStatus(SearchStatus.InProgress);

    console.log(
      "🚀 ~ file: SearchView.tsx:55 ~ handleClick ~ searchRef:",
      searchRef,
    );

    const { event, ...refWithoutEvent } = searchRef;

    const flightsData = await flightsQuery({
      // TODO: location.area + location.country
      ...refWithoutEvent,
      eventDate: searchRef.event.date,
      currency,
    });
    setFlightsData(flightsData);

    const accommodationData = await accommodationQuery({
      currency,
      eventDate: searchRef.event.date,
      numPeople: searchRef.numPeople,
      city: searchRef.destination.area,
      country: searchRef.destination.country,
      dateTo: flightsData?.outboundDate,
      dateFrom: flightsData?.inboundDate,
    });

    setAccommodationData(accommodationData);
    console.log(
      "🚀 ~ file: SearchView.tsx:77 ~ handleClick ~ accommodationData:",
      accommodationData,
    );
    setSearchStatus(SearchStatus.End);
  };

  const handleEventChange = (eventName: string, eventMetadataJSON: string) => {
    if (eventMetadataJSON === undefined) {
      return;
    }

    const metadata = JSON.parse(eventMetadataJSON);
    console.log(
      "🚀 ~ file: SearchView.tsx:83 ~ handleEventChange ~ metadata:",
      metadata,
    );

    const { destination, ...eventData } = metadata;
    console.log(searchRef);
    setSearchRef((ref: SearchRef) => ({
      ...ref,
      destination,
      event: eventData,
    }));
  };

  // TODO:
  const handleCommonChange = ({ target }: any) => {
    setSearchRef((ref: SearchRef) => ({
      ...ref,
      [target.dataset.name]: target.value,
    }));
  };

  const handlePeopleCountChange = (numPeople: number) => {
    setSearchRef((ref: SearchRef) => ({
      ...ref,
      numPeople,
    }));
  };

  console.log(
    "🚀 ~ file: SearchView.tsx:170 ~ SearchView ~ searchStatus:",
    searchStatus,
  );

  return (
    <>
      <div
        className="relative w-full md:mx-auto md:w-10/12 xl:w-9/12"
        ref={searchWrapRef}
      >
        <div className="flex flex-col h-[50vh] items-center text-white justify-center h-10/12 md:pb-0 md:flex-row md:justify-around md:pt-48">
          <PeopleCounter onUpdate={handlePeopleCountChange} />
          <p className="mx-2 my-2 md:my-0">
            going to
          </p>
          <EventAutocomplete
            className="w-11/12 min-h-[40px] md:w-80"
            data-name="eventName"
            value={searchRef?.event?.name ?? ""}
            onChange={handleEventChange}
          />
          <p className="mx-2 my-2 md:my-0">
            from
          </p>
          <TextField
            className="w-11/12 min-h-[40px] md:w-48"
            type="text"
            data-name="origin"
            value={searchRef?.origin ?? ""}
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
        {searchStatus === SearchStatus.End
          ? (
            <Results
              event={eventData}
              flights={flightsData}
              accommodation={accommodationData}
              currency={currency}
            />
          )
          : null}
      </div>
    </>
  );
}
