import config from "@config";
import { FlightsData, Maybe } from "../../../../types.ts";

export const flightsDataFrom = async (
  url: string,
): Promise<Maybe<FlightsData>> => {
  const res = await fetch(
    url,
    {
      headers: {
        "apikey": config.KIWI_API_KEY,
      },
    },
  ).then((res) => res.json());

  const result = res.data[0];

  if (result !== undefined) {
    // TODO: Export to CSV flights for more options?
    const { flyFrom, flyTo, price, deep_link, route } = result;

    const routeStops = route.length;
    if (routeStops > 0) {
      const inbound = route[0];
      const outbound = route[routeStops - 1];

      return {
        flyFrom,
        flyTo,
        price,
        url: deep_link,
        vehicleType: inbound.vehicle_type,
        inboundDate: inbound["local_departure"],
        outboundDate: outbound["local_departure"],
      };
    }
  }

  return null;
};
