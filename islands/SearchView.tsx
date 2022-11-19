import { useRef, useState } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import { TextField } from "@components";
import { QueryKey } from "../types.ts";
import EventAutocomplete from "../islands/EventAutocomplete.tsx";
import { searchFlights } from "../utils/fe/search-flights.ts";
import { searchAccommodation } from "../utils/fe/search-accommodation.ts";

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
    <div ref={searchWrapRef}>
      <TextField
        type="text"
        data-name={QueryKey.Origin}
        value={query.origin}
        onChange={handleCommonChange}
      />
      <TextField
        type="number"
        data-name={QueryKey.NumPeople}
        value={query.numPeople}
        onChange={handleCommonChange}
      />
      <EventAutocomplete
        data-name={QueryKey.EventName}
        value={query.eventName}
        onChange={handleEventChange}
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
      <br />

      <button className="bg-red-100" onClick={handleClick}>Search</button>
    </div>
  );
}
