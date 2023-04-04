import config from "@config";
import { normalizeEventData } from "./normalize-event-data.ts";
import { RAIndex } from "./types.ts";

export const searchEvents = async (searchTerm: string) => {
  console.log(
    "🚀 ~ file: search-events.ts:7 ~ searchEvents ~ config.RA_SEARCH_API:",
    config.RA_SEARCH_API,
  );
  const events = await fetch(config.RA_SEARCH_API, {
    "headers": {
      "content-type": "application/json",
    },
    "method": "POST",
    "body": JSON.stringify({
      query: `query RAGlobalSearch(
          $searchTerm: String!, 
          $indices: [IndexType!]
        ) {
          search(searchTerm: $searchTerm, limit: 16, indices: $indices, includeNonLive: false) { 
            searchType 
            id 
            value 
            areaName
            clubName
            countryName
            countryCode
            contentUrl
            date 
          }
        }`,
      variables: {
        searchTerm,
        indices: [RAIndex.Event],
      },
    }),
  }).then((res) => res.json());

  return events.data.search.map(normalizeEventData);
};
