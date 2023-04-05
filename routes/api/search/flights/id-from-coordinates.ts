import config from "@config";
import { LatLong } from "../../../../types.ts";

export const idFromCoordinates = async (location: LatLong) => {
  const data = await fetch(
    `${config.KIWI_API_LOCATIONS_HOST}/locations/radius?lat=${location.lat}&lon=${location.lng}&location_types=bus_station&location_types=station&location_types=airport&location_types=city`,
    {
      headers: {
        "apikey": config.KIWI_API_KEY,
      },
    },
  ).then((res) => {
    return res.json();
  });

  return data.locations[0].id;
};
