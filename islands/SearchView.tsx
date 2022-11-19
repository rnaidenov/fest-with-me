import { useState, useRef } from 'preact/hooks';
import { PageProps } from "$fresh/server.ts";
import { TextField } from '@components'
import { QueryKey } from '../types.ts';
import EventAutocomplete from '../islands/EventAutocomplete.tsx';
import { prepareFlightsQuery } from '../utils/fe/prepare-flights-query.ts';
import { prepareAccommodationQuery } from '../utils/fe/prepare-accommodation-query.ts';

/*
{
    "origin": "London", 
    "destination": "Sofia",
    "currency": "GBP",
    "numPeople": 2,
    "dateFrom": "19/11/2022",
    "dateTo": "22/11/2022", 
    "returnFrom": "28/11/2022",
    "returnTo": "30/11/2022"
} 
*/


export default function SearchView(props: PageProps) {
  const searchWrapRef = useRef()
  const [isSearching, setIsSearching] = useState(false);

  const [currency, setCurrency] = useState('GBP');
  const [flightsData, setFlightsData] = useState(null);
  const [accommodationData, setaAccommodationData] = useState(null);
  // TODO: Event name and metadata!
  const [query, setQuery] = useState({ [QueryKey.Origin]: '', [QueryKey.NumPeople]: '', [QueryKey.EventName]: '' })

  const handleClick = async (e) => {
    // Throw a request to kiwi
    // Throw a request to AirBnb

    console.log('query', query)

    const kiwiData = await fetch('/api/search/kiwi', {
      'method': "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prepareFlightsQuery({ ...query, currency }))
    }).then(res => res.json());
    console.log("🚀 ~ file: SearchView.tsx ~ line 77 ~ handleClick ~ flightsData", flightsData);

    setFlightsData(kiwiData);

    const airbnbData = await fetch('/api/search/airbnb', {
      'method': "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prepareAccommodationQuery({
        currency,
        city: query.destinationCity,
        country: query.destinationCountry,
        dateFrom: kiwiData.inboundDate,
        dateTo: kiwiData.outboundDate,
        numPeople: query.numPeople
      }))
    }).then(res => res.json());

    setaAccommodationData(airbnbData);
    console.log("🚀 ~ file: SearchView.tsx ~ line 51 ~ handleClick ~ airBnbRes", airbnbData)
    // {"flyFrom":"SOF","flyTo":"STN","price":187,"url":"https://www.kiwi.com/deep?affilid=radoslavnaydenovfestwithme&currency=GBP&flightsId=0f5825584b76000054f097c2_0%7C2558032d4b770000986732b6_0%7C0a2b0f584b7d000068befce3_0&from=SOF&lang=en&passengers=2&to=STN&booking_token=Et-UF9Grpser1UWnV8_srCfSbb8nJejH9Ii-XevSG5Ud0-StKQ8iRQv33sAytf6uPlbmLK3CxJ3tq16v39QXD_1Jqzr7X3mImO4zdLL8f8dg80hZQfNXgQVC76pur1iXr3W1m_s6bqwYFkL0IHYW8FHz7-44M_AwLfiynDK5SYzYGZ_TMKL1Ri7zpV1-6h80_DJzfCNA4KU221m98fbfXfuIXyD0oQ5BjHEMalSuAn7a3kceT6STCrfw1nZbS_ezm5iMOmGCARfelVseawX3Y3lp65_He_K7u2wiCYiUrIqF6bZzpRX7j9l600p5rov8sEKnNEozRnXIZbgEaOdCR74LqdgVG0LRDtKU-UgDxJToxSmDaHOPISUOoTlj0K7R-v8__7jmWzoJYUILGYePy5p395BrNJRPPviwhAhVR49bs-n3yXztX0NhBA82TUiQD08odcT0AQPDwuV0w9aTd-IQZAZsxd-5CZLNvKHxtFVXuW1OKTPQbBszgPixh9OjPTegCFRYjygFZC8mtQVk6VwD2p3kboWD6cAchzT3DVDQ8U2NdyXtoPBVrlPFjJzMV04F0CcQQrAvC2Gs90xMOAOEespSme6ZLzSzS3Damp1UszlYA7sN_Xr_LPGffwq_X"}
  };

  const handleEventChange = (eventName, eventMetadataJSON) => {
    const eventMetadata = JSON.parse(eventMetadataJSON);

    const composeEventQuery = (eventName, eventMetadataJSON) => ({
      [QueryKey.EventName]: eventName,
      [QueryKey.Destination]: eventMetadata.city,
      [QueryKey.EventDate]: eventMetadata.date,
    })

    setQuery((query) => ({ ...query, ...composeEventQuery(eventName, eventMetadataJSON) }))
  }

  const handleCommonChange = ({ target }) => {
    setQuery((query) => ({ ...query, [target.dataset.name]: target.value }));
  }

  return (
    <div ref={searchWrapRef}>
      <TextField type="text" data-name={QueryKey.Origin} value={query.origin} onChange={handleCommonChange} />
      <TextField type="number" data-name={QueryKey.NumPeople} value={query.numPeople} onChange={handleCommonChange} />
      <EventAutocomplete data-name={QueryKey.EventName} value={query.eventName} onChange={handleEventChange} />

      <br />
      <b>Flights:</b>
      <br />
      {flightsData ? JSON.stringify(flightsData) : isSearching ? '🤔💭' : '💩'}
      <br />
      <b>Airbnb:</b>
      <br />

      {accommodationData ? JSON.stringify(accommodationData) : isSearching ? '🤨🧐🤨' : '💩'}
      <br />
      <br />

      <button className="bg-red-100" onClick={handleClick}>Search</button>
    </div>
  )
}
