import { useEffect, useRef, useState } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import { Results, SearchForm } from "@components";
import {
  AccommodationData,
  CurrencyCode,
  EventData,
  FlightsData,
  SearchRef,
  SearchResults,
} from "../types.ts";
import { accommodationQuery, flightsQuery } from "../utils/fe/index.ts";
import { Maybe, SearchStatus } from "../types.ts";
import { CurrencyContext } from "../context/CurrencyContext.ts";
import { Loader } from "../components/Loader/Loader.tsx";

// TODO: Fix button active state
// TODO: Events on the same date
// TODO: Events in the past
// TODO: Events for which no flights

export default function SearchView(props: PageProps) {
  // const searchWrapRef = useRef();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(
    SearchStatus.Init,
    // SearchStatus.End,
  );

  // const [eventData, setEventData] = useState({
  //   "id": "1671358",
  //   "date": "2023-04-21T23:00:00.000",
  //   "price": 0,
  //   "url": "https://ra.co/events/1671358",
  // });
  // const [flightsData, setFlightsData] = useState({
  //   "flyFrom": "SOF",
  //   "flyTo": "VIE",
  //   "price": 0,
  //   "url":
  //     "https://www.kiwi.com/deep?affilid=radoslavnaydenovfestwithme&currency=GBP&flightsId=0f5819ef4c120000ae65dbe0_0%7C19ef0f584c150000fe755a4e_0&from=SOF&lang=en&passengers=1&to=VIE&booking_token=EfotmxDXdjIdycKQuOgtGPXuq_o6H6Y95QoJqBORh1VS1FtYyj5BJgfdmaS19P-7wtTrzp-8Vjtfc9v2An9ZXeYjDaMjz9Pj4ac_b0DjyvuLNvfp1OrFjA67e5oUfLTvw8ZhqoA1SYW1PVtWoVRiD7iVWhnuZKC3YvzeWv0xTj9QRysp5y7O0FCMcuq2Gs8GCWNhnBzTQj-XAWggYE3bA9JV74xJmQb0fjukYihLI5QPtKEGnwUfFqysTIIGpOLg3srWPH_KWqMXdZsSe1SHcKrn48BDiMZHrpIfYsI71HnTxKLT6Z-_g_dYpL7V5XxfuSBH6XoVhKhJihyJUdgde166Hy2HEPHmqYq9ExRc6UmunnBs-CcoHh4Tdq8XWB-fi_ZUnfOhNSGQM9CYHdsVIr-QVrMSOVNBLLYlc3STNgJdUYWwJhnqjLrk7ukwh-mJCcx4FT2wI3Gm1b-fHq6_mry6Z10XA-OdERIfrLRDbSBI-oaOv0kiQfcIe0iH6fET8kWxcZve469sIZcrbBQEndarwckjVLAzV1EDtuWgXp248S3yKiyiVY2iaKi5Emn7Pu0mzOLBYdQHTWRiK1uU_QkxmYk-5feF2n027E7h6qc-lxM-mPoef-HsJh2gUWKlHVzJkzIIqwzs4O3H720nX8q26BvnLiHbRtrgmnPQI-kRh0FWz4b5EqRnpE58JLVfG3ypuFUW2tdumHBJWQjB3XPusqd4BZYzTl5qg3aGG6AyT-0eS_jHjQ5eDenlATgg1UrcGt1dvdLylkUux1niMMg==",
  //   "inboundDate": "2023-04-27T15:20:00.000Z",
  //   "outboundDate": "2023-04-30T11:20:00.000Z",
  //   vehicleType: undefined,
  // });
  // const [accommodationData, setAccommodationData] = useState({
  //   "price": 173,
  //   "avgPricePrivateRoom": 129,
  //   "avgPriceSharedRoom": 42,
  //   "avgPriceEntirePlace": 189,
  //   "url":
  //     "https://www.airbnb.co.uk/s/homes?query=Austria,Austria&checkin=2023-04-27T15:20:00.000Z&checkout=2023-04-30T11:20:00.000Z&adults=1&currency=GBP",
  // });
  const [eventData, setEventData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);
  const [accommodationData, setAccommodationData] = useState(null);
  // TODO: Event name and metadata!

  const [searchText, setSearchText] = useState("");

  const currency = CurrencyContext.currency.value;

  const handleSubmit = async (searchRef: SearchRef) => {
    if (searchRef === null) {
      return;
    }

    setSearchStatus(SearchStatus.InProgress);
    setSearchText("Looking for the best flights...");

    const { event, destination, ...refWithoutEvent } = searchRef;

    const flightsData = await flightsQuery({
      // TODO: location.area + location.country
      ...refWithoutEvent,
      eventDate: event.date,
      currency: currency.active,
      destination: destination.geo,
    });

    setFlightsData(flightsData);

    setSearchText("Searching for accommodation...");

    const accommodationData = await accommodationQuery({
      currency: currency.active,
      eventDate: searchRef.event.date,
      numPeople: searchRef.numPeople,
      destination: searchRef.destination.address,
      dateTo: flightsData?.outboundDate,
      dateFrom: flightsData?.inboundDate,
    });

    setAccommodationData(accommodationData);

    setSearchStatus(SearchStatus.End);
  };

  // TODO: utils?
  const onCurrencyChange = async (
    from: CurrencyCode,
    to: CurrencyCode,
    amounts: { event: number; flights: number; accommodation: number },
  ) => {
    if (from === to) {
      return;
    }

    const converted = await fetch("/api/currency", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        amounts: Object.values(amounts),
      }),
    }).then((res) => res.json());
    const results = [eventData, flightsData, accommodationData];

    [setEventData, setFlightsData, setAccommodationData].forEach((
      updateHandler: any,
      idx: number,
    ) => {
      updateHandler((data: typeof results) => ({
        ...data,
        price: converted[idx],
        url: results[idx].url.replace(from, to),
      }));
    });
  };

  useEffect(() => {
    // TODO: Probs will need to check for valid prices as well
    if (currency.prev !== null && currency.active !== null) {
      onCurrencyChange(
        currency.prev,
        currency.active,
        {
          event: eventData.price,
          flights: flightsData.price,
          accommodation: accommodationData.price,
        },
      );
    }
  }, [currency.prev]);

  return (
    <>
      <SearchForm
        onSubmit={handleSubmit}
        onEventChange={(event: EventData) => setEventData(event)}
      />

      <div className="absolute left-[50%] top-[60%] left-[50%] translate-x-[-50%]">
        {searchStatus === SearchStatus.InProgress &&
          (
            <Loader
              text={searchText}
            />
          )}
      </div>

      <div
        className={`h-full 
        ${searchStatus === SearchStatus.End ? "block" : "hidden"}`}
      >
        <Results
          event={eventData}
          flights={flightsData}
          accommodation={accommodationData}
        />
      </div>
    </>
  );
}
