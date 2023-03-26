import config from "@config";
import { CurrencySymbol } from "../../../../consts.ts";
import { AccommodationSearchQuery } from "../../../../types.ts";
import { searchUrl } from "./search-url.ts";
import { AirbnbFilter } from "./types.ts";

export const prepareQuery =
  (query: AccommodationSearchQuery) => async (roomType = "") => {
    // TODO: check in and out data to be of string type
    // TODO: Node cache

    const url = searchUrl({ ...query, roomType });

    const resJSON = await fetch(url, {
      headers: {
        "x-airbnb-api-key": config.AIRBNB_API_KEY,
      },
    }).then((res) => res.json());

    const sections = resJSON.data.presentation.explore.sections.sections;
    const firstFilterV2 = sections.find((
      section: { sectionComponentType: string },
    ) => section.sectionComponentType === AirbnbFilter.Explore);
    const avgPriceText =
      firstFilterV2.section.discreteFilterItems[0].text.subtitle;

    const currencySymbol = CurrencySymbol[query.currency];

    return Number(avgPriceText.split(currencySymbol)[1].trim());
  };
