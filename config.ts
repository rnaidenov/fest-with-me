export default {
  KIWI_API_KEY: Deno.env.get("KIWI_API_KEY") as string,
  KIWI_API_SEARCH_HOST: Deno.env.get("KIWI_API_SEARCH_HOST") as string,
  KIWI_API_LOCATIONS_HOST: Deno.env.get("KIWI_API_LOCATIONS_HOST") as string,
  RA_HOST: Deno.env.get("RA_HOST") as string,
  RA_SEARCH_API: Deno.env.get("RA_SEARCH_API") as string,
  AIRBNB_API_KEY: Deno.env.get("AIRBNB_API_KEY") as string,
  AIRBNB_API_SEARCH_HOST: Deno.env.get("AIRBNB_API_SEARCH_HOST") as string,
  GOOGLE_MAPS_API_KEY: Deno.env.get("GOOGLE_MAPS_API_KEY") as string,
};
