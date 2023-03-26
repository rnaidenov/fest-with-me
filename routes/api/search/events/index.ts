import { searchEvents } from "./search-events.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const body = await req.json();

    const data = await searchEvents(body.query);

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    // TODO: Add pino?
    console.error(error);
  }
};
