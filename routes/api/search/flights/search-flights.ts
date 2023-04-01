import { FlightsData, FlightsSearchQuery, Maybe } from "../../../../types.ts";
import { buildUrl } from "./build-url.ts";
import { flightsDataFrom } from "./flights-data-from.ts";
import { getCityCode } from "./get-city-code.ts";

// TODO: Make date before / ater event configurable
// TODO: If city is random unsearchable thing, then look by country
export const searchFlights = async ({
  origin,
  destination,
  ...filters
}: FlightsSearchQuery): Promise<Maybe<FlightsData>> => {
  const originCode = await getCityCode(origin);

  // TODO: Use country if it fails with destination city
  const destinationCode = await getCityCode(destination.city as string);

  // TODO: What if event is today / tomorrow
  const url = buildUrl({
    origin: originCode,
    destination: destinationCode,
    ...filters,
  });

  return flightsDataFrom(url);
};
