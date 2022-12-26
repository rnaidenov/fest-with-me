import { Handlers } from "$fresh/server.ts";

import { AccommodationType, CurrencyCode } from "../../../types.ts";
import { CURRENCY_CODE_TO_SYMBOL_MAP } from "../../../consts.ts";

// TODO: Environment variable!!
const AIRBNB_API_SEARCH_URL = "https://www.airbnb.co.uk/api/v3/StaysSearch";
const AIRBNB_API_KEY = "d306zoyjsyarp7ifhu67rjxn52tv0t20";

// private-room
// shared-room
// entire-home

// roomType
// currency
// checkInDate
// checkOutDate

const currency = CurrencyCode.GBP;

const checkInDate = "2022-10-01";
const checkOutDate = "2022-10-07";

const peopleCount = 2;
const city = "London";
const country = "United Kingdom";

const FILTER_COMPONENT_TYPE = "EXPLORE_FILTER_V2";

const generateUrl = (
  currency,
  numPeople,
  checkInDate,
  checkOutDate,
  city,
  country,
  roomType = "",
) =>
  `${AIRBNB_API_SEARCH_URL}?operationName=StaysSearch&locale=en-GB&currency=${currency}&variables=%7B%22isInitialLoad%22%3Atrue%2C%22hasLoggedIn%22%3Afalse%2C%22cdnCacheSafe%22%3Afalse%2C%22source%22%3A%22EXPLORE%22%2C%22exploreRequest%22%3A%7B%22metadataOnly%22%3Afalse%2C%22version%22%3A%221.8.3%22%2C%22refinementPaths%22%3A%5B%22%2Fhomes%22%5D%2C%22checkin%22%3A%22${checkInDate}%22%2C%22checkout%22%3A%22${checkOutDate}%22%2C%22datePickerType%22%3A%22calendar%22%2C%22adults%22%3A${numPeople}%2C%22searchType%22%3A%22filter_change%22%2C%22tabId%22%3A%22home_tab%22%2C%22flexibleTripLengths%22%3A%5B%22one_week%22%5D%2C%22priceFilterNumNights%22%3A1%2C%22source%22%3A%22structured_search_input_header%22%2C%22roomTypes%22%3A%5B%22${roomType}%22%5D%2C%22query%22%3A%22${city}%2C+${country}%22%2C%22itemsPerGrid%22%3A20%2C%22cdnCacheSafe%22%3Afalse%2C%22treatmentFlags%22%3A%5B%22flex_destinations_june_2021_launch_web_treatment%22%2C%22new_filter_bar_v2_fm_header%22%2C%22new_filter_bar_v2_and_fm_treatment%22%2C%22merch_header_breakpoint_expansion_web%22%2C%22flexible_dates_12_month_lead_time%22%2C%22storefronts_nov23_2021_homepage_web_treatment%22%2C%22lazy_load_flex_search_map_compact%22%2C%22lazy_load_flex_search_map_wide%22%2C%22im_flexible_may_2022_treatment%22%2C%22im_flexible_may_2022_treatment%22%2C%22flex_v2_review_counts_treatment%22%2C%22flexible_dates_options_extend_one_three_seven_days%22%2C%22super_date_flexibility%22%2C%22micro_flex_improvements%22%2C%22micro_flex_show_by_default%22%2C%22search_input_placeholder_phrases%22%2C%22pets_fee_treatment%22%5D%2C%22screenSize%22%3A%22large%22%2C%22isInitialLoad%22%3Atrue%2C%22hasLoggedIn%22%3Afalse%7D%2C%22staysSearchM2Enabled%22%3Afalse%2C%22staysSearchM6Enabled%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22f6d61dd9066cfb0dac42a75b56537de47bd83eba92460c36d32a476ddb7b2169%22%7D%7D`;

const query =
  (currency, numPeople, checkInDate, checkOutDate, city, country) =>
  async (roomType = "") => {
    // TODO: check in and out data to be of string type
    // TODO: Node cache

    const url = generateUrl(
      currency,
      numPeople,
      checkInDate,
      checkOutDate,
      city,
      country,
      roomType,
    );

    const resJSON = await fetch(url, {
      headers: {
        "x-airbnb-api-key": AIRBNB_API_KEY,
      },
    }).then((res) => res.json());

    const sections = resJSON.data.presentation.explore.sections.sections;
    const firstFilterV2 = sections.find((section) =>
      section.sectionComponentType === FILTER_COMPONENT_TYPE
    );
    const avgPriceText =
      firstFilterV2.section.discreteFilterItems[0].text.subtitle;

    const currencySymbol = CURRENCY_CODE_TO_SYMBOL_MAP[currency];

    return Number(avgPriceText.split(currencySymbol)[1].trim());
  };

const queryAirbnb = async (
  currency,
  numPeople,
  checkInDate,
  checkOutDate,
  city,
  country,
) => {
  const queryForProperty = query(
    currency,
    numPeople,
    checkInDate,
    checkOutDate,
    city,
    country,
  );

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
    url:
      `https://www.airbnb.co.uk/s/homes?query=${city},${country}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${numPeople}&currency=${currency}`,
  };
};

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    const body = await req.json();

    // TODO: Validation!
    const { currency, numPeople, checkInDate, checkOutDate, city, country } =
      body;

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

    const data = await queryAirbnb(
      currency,
      numPeople,
      checkInDate,
      checkOutDate,
      city,
      country,
    );
    console.log("🚀 ~ file: airbnb.ts:141 ~ handler ~ data", data);

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
