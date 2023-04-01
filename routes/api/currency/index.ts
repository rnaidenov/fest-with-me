import CC from "currency-converter";

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const body = await req.json();

    const { from, to, amounts } = body;

    const converted = await Promise.all(
      amounts.map(async (amount: number) =>
        (isNaN(Number(amount)) || amount === 0) ? 0 : Math.round(
          await new CC({ from, to, amount }).convert(),
        )
      ),
    );

    return new Response(JSON.stringify(converted), {
      status: 200,
    });
  } catch (error) {
    // TODO: Add pino?
    console.error(error);
  }
};
