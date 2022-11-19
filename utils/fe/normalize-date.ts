import { addDays, format } from "date-fns";

export const normalizeDate = (
  dateString: string,
  daysToChangeBy: number[],
  newDateFormat?: string,
) => {
  try {
    const date = new Date(dateString);

    const shouldFormat = typeof newDateFormat === "string" &&
      newDateFormat.length > 0;

    if (daysToChangeBy.length > 0) {
      const sese = daysToChangeBy.map((dayDifference: number) =>
        shouldFormat
          ? format(addDays(date, dayDifference), newDateFormat)
          : addDays(date, dayDifference)
      );
      console.log("🚀 ~ file: normalize-date.ts ~ line 20 ~ sese", sese);
      return sese;
    } else if (shouldFormat) {
      return [format(date, newDateFormat)];
    } else {
      return [dateString];
    }
  } catch (error: unknown) {
    console.error("- normalizeDate() error -");
    console.error(String(error));
    console.error("- normalizeDate() error -");
    return [];
  }
};
