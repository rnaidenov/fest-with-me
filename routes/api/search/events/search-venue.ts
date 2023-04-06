import config from "../../../../config.ts";
import { geocode } from "../flights/geocode.ts";

export const searchVenue = async (venueId: string) => {
  const res = await fetch(config.RA_SEARCH_API, {
    "headers": {
      "content-type": "application/json",
    },
    "method": "POST",
    "body": JSON.stringify({
      query: `query GET_VENUE($id: ID!) {
        venue(id: $id) {
          id
          name
          address
        }
      }`,
      variables: {
        id: venueId,
      },
    }),
  }).then((res) => res.json());

  // if venue.adddress !== null / undefined, geocode it
  const coordinates = await geocode(res.data.venue.address);

  return { ...res.data.venue, geo: coordinates };
};
