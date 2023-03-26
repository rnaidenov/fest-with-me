import config from "../../../../config.ts";
import { RAEventData } from "./types.ts";

export const normalizeEventData = (event: RAEventData) => ({
  id: event.id,
  name: event.value,
  destination: {
    area: event.areaName,
    club: event.clubName,
    country: event.countryName,
  },
  date: event.date,
  price: 0,
  url: `${config.RA_HOST}${event.contentUrl}`,
});
