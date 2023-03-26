import { load } from "https://deno.land/std@0.180.0/dotenv/mod.ts";

const configData = await load();

export default {
  KIWI_API_KEY: configData.KIWI_API_KEY,
  KIWI_API_SEARCH_HOST: configData.KIWI_API_SEARCH_HOST,
  KIWI_API_LOCATIONS_HOST: configData.KIWI_API_LOCATIONS_HOST,
  RA_HOST: configData.RA_HOST,
  RA_SEARCH_API: configData.RA_SEARCH_API,
  AIRBNB_API_KEY: configData.AIRBNB_API_KEY,
  AIRBNB_API_SEARCH_HOST: configData.AIRBNB_API_SEARCH_HOST,
};
