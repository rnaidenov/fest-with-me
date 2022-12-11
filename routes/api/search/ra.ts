import { Handlers } from "$fresh/server.ts";

const RA_SEARCH_API = "https://ra.co/graphql";
const RA_SEARCH_OPERATION_NAME = "GET_GLOBAL_SEARCH_RESULTS";
const RA_EVENT_INDEX = "EVENT";
const RA_HOST = "https://ra.co";

// TODO: Utils
const searchRA = async (searchTerm: string) => {
  const eventsResponse = await fetch(RA_SEARCH_API, {
    "headers": {
      "content-type": "application/json",
    },
    "method": "POST",
    "body": `
      {
        "operationName": "${RA_SEARCH_OPERATION_NAME}",
        "variables":{
        "searchTerm": "${searchTerm}",
        "indices":["${RA_EVENT_INDEX}"]
      },
        "query":"query GET_GLOBAL_SEARCH_RESULTS($searchTerm: String!, $indices: [IndexType!]) {search(searchTerm: $searchTerm, limit: 16, indices: $indices, includeNonLive: false) { searchType id value areaName countryName countryCode contentUrl date }}"
      }
    `,
  }).then((res) => res.json());

  return eventsResponse.data.search.map((
    { id, value, areaName, countryName, date, contentUrl },
  ) => ({
    id: id,
    name: value,
    city: areaName,
    country: countryName,
    date: date,
    url: `${RA_HOST}${contentUrl}`,
  }));
};

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const body = await req.json();

    if (!body.query) {
      // TODO: Provided in request function similar to HL
      return new Response({
        error: 'Required "query" value is not provided in the request body.',
      }, {
        status: 400,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      });
    }

    const data = await searchRA(body.query);

    return new Response(JSON.stringify(data, {
      status: 200,
      headers: {
        // TODO: No repetition!
        "content-type": "application/json; charset=utf-8",
      },
    }));
  } catch (error) {
    // TODO: Add pino?
    console.error(error);
  }
};
