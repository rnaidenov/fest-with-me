import { Handlers } from "$fresh/server.ts";
import CC from "currency-converter";

const CurrencyConverter = new CC();

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const body = await req.json();

    const { from, to, amounts } = body;
    console.log(
      "🚀 ~ file: index.ts:11 ~ handler ~ from, to, amount",
      from,
      to,
      amounts,
    );

    const converted = await Promise.all(
      amounts.map(async (amount: number) =>
        Math.ceil(await new CC({ from, to, amount }).convert())
      ),
    );

    // if (!body.query) {
    //   // TODO: Provided in request function similar to HL
    //   return new Response({
    //     error: 'Required "query" value is not provided in the request body.'
    //   }, {
    //     status: 400,
    //     headers: {
    //       "content-type": "application/json; charset=utf-8",
    //     },
    //   });
    // };

    return new Response(JSON.stringify(converted, {
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
