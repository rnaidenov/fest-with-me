import { EventData, SearchRef } from "../../types.ts";

export interface SearchFormProps {
  onEventChange: (eventData: EventData) => void;
  onSubmit: (searchRef: SearchRef) => void;
}
