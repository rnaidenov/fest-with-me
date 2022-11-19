import { Handlers } from "$fresh/server.ts";

const KIWI_API_LOCATIONS_HOST = "https://api.tequila.kiwi.com";
const KIWI_API_SEARCH_HOST = "https://api.tequila.kiwi.com/v2";

const KIWI_API_KEY = "z9Vf_KkTX1DFp6zVDczvJtUov1PUN56J";

import { CurrencyCode } from "../../../types.ts";

// TODO: 2-3 days before the festival

// TODO: Environemnt variables
// TODO: 2-3 days?
// dd/mm/YYYY
// const returnFrom = '25/09/2022';
// const returnTo = '29/09/2022';

const maxStopovers = 0;

const getCityCode = async (location: string) => {
  const data = await fetch(
    `${KIWI_API_LOCATIONS_HOST}/locations/query?term=${location}&limit=1&active_only=true`,
    {
      headers: {
        "apikey": KIWI_API_KEY,
      },
    },
  ).then((res) => res.json());

  return data.locations[0].code;
};

const generateUrl = (
  currency: CurrencyCode,
  origin: string,
  destination: string,
  dateFrom: string,
  dateTo: string,
  numPeople: number,
  returnFrom?: string,
  returnTo?: string,
) => {
  const oneWay = !returnFrom && !returnTo;

  return `${KIWI_API_SEARCH_HOST}/search?fly_from=${origin}&fly_to=${destination}&date_from=${dateFrom}&date_to=${dateTo}&adults=${numPeople}&curr=${currency}&max_stopovers=${maxStopovers}&one_for_city=1&location_types=city${
    oneWay ? "" : `&return_from=${returnFrom}&return_to=${returnTo}`
  }`;
};

const queryKiwi = async (
  currency: CurrencyCode,
  origin: string,
  destination: string,
  dateFrom: string,
  dateTo: string,
  numPeople: number,
  returnFrom?: string,
  returnTo?: string,
) => {
  const originCode = await getCityCode(origin);
  const destinationCode = await getCityCode(destination);

  const res = await fetch(
    generateUrl(
      currency,
      originCode,
      destinationCode,
      dateFrom,
      dateTo,
      numPeople,
      returnFrom,
      returnTo,
    ),
    {
      headers: {
        "apikey": KIWI_API_KEY,
      },
    },
  ).then((res) => res.json());

  console.log(res);

  const result = res.data[0];

  if (result !== undefined) {
    // TODO: Export to CSV flights for more options?
    const { flyFrom, flyTo, price, deep_link, route } = result;
    console.log("🚀 ~ file: kiwi.ts ~ line 58 ~ queryKiwi ~ result", result);
    throw Error("sese");

    return {
      flyFrom,
      flyTo,
      price,
      url: deep_link,
    };
  }

  return null;
};

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const body = await req.json();

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

    const {
      currency,
      origin,
      destination,
      numPeople,
      dateFrom,
      dateTo,
      returnFrom,
      returnTo,
    } = body;

    const data = await queryKiwi(
      currency,
      origin,
      destination,
      dateFrom,
      dateTo,
      numPeople,
      returnFrom,
      returnTo,
    );

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
