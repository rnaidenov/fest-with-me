import { FlightsSearchQuery } from "@types";

import { searchFlights } from "./search-flights.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const query: FlightsSearchQuery = await req.json();

    const data = await searchFlights(query);

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    // TODO: Add pino?
    console.error(error);
  }
};
