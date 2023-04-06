import { FlightsData, FlightsSearchQuery, Maybe } from "../../../../types.ts";
import { buildUrl } from "./build-url.ts";
import { flightsDataFrom } from "./flights-data-from.ts";
import { geocode } from "./geocode.ts";
import { idFromCoordinates } from "./id-from-coordinates.ts";

// TODO: Make date before / ater event configurable
// TODO: If city is random unsearchable thing, then look by country
export const searchFlights = async ({
  origin,
  destination,
  ...filters
}: FlightsSearchQuery): Promise<Maybe<FlightsData>> => {
  const originCoords = await geocode(origin);
  const originId = await idFromCoordinates(originCoords);

  const destinationId = await idFromCoordinates(destination);

  // TODO: What if event is today / tomorrow
  const url = buildUrl({
    origin: originId,
    destination: destinationId,
    ...filters,
  });

  return flightsDataFrom(url);
};
