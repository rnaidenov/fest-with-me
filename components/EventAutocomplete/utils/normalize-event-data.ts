import { EventData } from "../../../types.ts";

export const normalizeEventData = (data: EventData[]) =>
  data.map(({ name, ...metdata }) => ({
    key: name,
    metadata: JSON.stringify(metdata),
  }));
