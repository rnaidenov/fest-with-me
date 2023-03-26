import {
  AccommodationSearchQuery,
  AccommodationType,
} from "../../../../types.ts";
import { prepareQuery } from "./prepare-query.ts";
import { resultsUrl } from "./results-url.ts";

export const searchAccommodation = async (query: AccommodationSearchQuery) => {
  const queryForProperty = prepareQuery(query);

  const avgPriceTotal = await queryForProperty();
  const avgPricePrivateRoom = await queryForProperty(
    AccommodationType.PrivateRoom,
  );
  const avgPriceSharedRoom = await queryForProperty(
    AccommodationType.SharedRoom,
  );
  const avgPriceEntirePlace = await queryForProperty(
    AccommodationType.EntireHome,
  );

  return {
    price: avgPriceTotal,
    avgPricePrivateRoom,
    avgPriceSharedRoom,
    avgPriceEntirePlace,
    url: resultsUrl(query),
  };
};
