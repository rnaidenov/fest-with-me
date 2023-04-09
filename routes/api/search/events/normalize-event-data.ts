import config from "../../../../config.ts";
import { RAEventData } from "./types.ts";

export const normalizeEventData = (event: RAEventData) => ({
  id: event.id,
  name: event.value,
  area: event.areaName,
  venueId: event.clubContentUrl.split("/").pop(),
  date: event.date,
  price: 0,
  url: `${config.RA_HOST}${event.contentUrl}`,
});
