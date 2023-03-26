import { AccommodationSearchQuery } from "../../../../types.ts";

import { searchAccommodation } from "./search-accommodation.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const query: AccommodationSearchQuery = await req.json();

    const data = await searchAccommodation(query);

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    // TODO: Add pino?
    console.error(error);
  }
};
