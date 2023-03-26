import config from "@config";

export const getCityCode = async (location: string) => {
  const data = await fetch(
    `${config.KIWI_API_LOCATIONS_HOST}/locations/query?term=${location}&limit=1&active_only=true`,
    {
      headers: {
        "apikey": config.KIWI_API_KEY,
      },
    },
  ).then((res) => res.json());

  return data.locations[0].code;
};
