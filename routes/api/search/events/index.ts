import { searchEvents } from "./search-events.ts";
import { searchVenue } from "./search-venue.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    if (req.method === "GET") {
      const urlParams = new URLSearchParams(req.url.split("?")[1]);
      // TODO: When no id is provided.
      const data = await searchVenue(urlParams.get("venueId")!);

      return new Response(JSON.stringify(data), {
        status: 200,
      });
    } else if (req.method === "POST") {
      // TODO: Add validation.{
      const body = await req.json();

      const data = await searchEvents(body.query);

      return new Response(JSON.stringify(data), {
        status: 200,
      });
    }
  } catch (error) {
    // TODO: Add pino?
    console.error(error);
  }
};
