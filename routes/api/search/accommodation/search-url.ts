import config from "@config";
import {
  AccommodationSearchQuery,
  AccommodationType,
} from "../../../../types.ts";

export const searchUrl = ({
  currency,
  numPeople,
  checkInDate,
  checkOutDate,
  city,
  country,
  roomType = "",
}: AccommodationSearchQuery & { roomType: AccommodationType | string }) =>
  `${config.AIRBNB_API_SEARCH_HOST}?operationName=StaysSearch&locale=en-GB&currency=${currency}&variables=%7B%22isInitialLoad%22%3Atrue%2C%22hasLoggedIn%22%3Afalse%2C%22cdnCacheSafe%22%3Afalse%2C%22source%22%3A%22EXPLORE%22%2C%22exploreRequest%22%3A%7B%22metadataOnly%22%3Afalse%2C%22version%22%3A%221.8.3%22%2C%22refinementPaths%22%3A%5B%22%2Fhomes%22%5D%2C%22checkin%22%3A%22${checkInDate}%22%2C%22checkout%22%3A%22${checkOutDate}%22%2C%22datePickerType%22%3A%22calendar%22%2C%22adults%22%3A${numPeople}%2C%22searchType%22%3A%22filter_change%22%2C%22tabId%22%3A%22home_tab%22%2C%22flexibleTripLengths%22%3A%5B%22one_week%22%5D%2C%22priceFilterNumNights%22%3A1%2C%22source%22%3A%22structured_search_input_header%22%2C%22roomTypes%22%3A%5B%22${roomType}%22%5D%2C%22query%22%3A%22${city}%2C+${country}%22%2C%22itemsPerGrid%22%3A20%2C%22cdnCacheSafe%22%3Afalse%2C%22treatmentFlags%22%3A%5B%22flex_destinations_june_2021_launch_web_treatment%22%2C%22new_filter_bar_v2_fm_header%22%2C%22new_filter_bar_v2_and_fm_treatment%22%2C%22merch_header_breakpoint_expansion_web%22%2C%22flexible_dates_12_month_lead_time%22%2C%22storefronts_nov23_2021_homepage_web_treatment%22%2C%22lazy_load_flex_search_map_compact%22%2C%22lazy_load_flex_search_map_wide%22%2C%22im_flexible_may_2022_treatment%22%2C%22im_flexible_may_2022_treatment%22%2C%22flex_v2_review_counts_treatment%22%2C%22flexible_dates_options_extend_one_three_seven_days%22%2C%22super_date_flexibility%22%2C%22micro_flex_improvements%22%2C%22micro_flex_show_by_default%22%2C%22search_input_placeholder_phrases%22%2C%22pets_fee_treatment%22%5D%2C%22screenSize%22%3A%22large%22%2C%22isInitialLoad%22%3Atrue%2C%22hasLoggedIn%22%3Afalse%7D%2C%22staysSearchM2Enabled%22%3Afalse%2C%22staysSearchM6Enabled%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22f6d61dd9066cfb0dac42a75b56537de47bd83eba92460c36d32a476ddb7b2169%22%7D%7D`;
