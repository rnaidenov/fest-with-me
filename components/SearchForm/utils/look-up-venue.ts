export const lookUpVenue = async (venueId: string, area: string) => {
  try {
    const venue = await fetch(
      `/api/search/events?venueId=${venueId}&area=${area}`,
    ).then((
      res,
    ) => res.json());
    return venue;
  } catch (error) {
    console.error("-- [error] lookUpVenue(): -- ");
    console.error(error);

    return null;
  }
};
