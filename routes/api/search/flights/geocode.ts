import config from "@config";
import { LatLong } from "../../../../types.ts";

export const geocode = async (address: string): Promise<LatLong> => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.GOOGLE_MAPS_API_KEY}&language=en`,
  )
    .then((res) => res.json());

  return res.results[0].geometry.location;
};
