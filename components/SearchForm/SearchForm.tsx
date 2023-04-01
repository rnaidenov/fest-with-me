import Preact from "preact";
import { useState } from "preact/hooks";
import { EventAutocomplete } from "../EventAutocomplete/EventAutocomplete.tsx";
import { SearchRef } from "../../types.ts";
import { NumberInput } from "../NumberInput/NumberInput.tsx";
import { TextField } from "../TextField/TextField.tsx";
import { SearchFormProps } from "./types.ts";

export const SearchForm = ({ onEventChange, onSubmit }: SearchFormProps) => {
  const [searchRef, setSearchRef] = useState<SearchRef>({});

  const handleCommonChange =
    (searchRefProp: keyof SearchRef) =>
    (src: Preact.ChangeEvent<HTMLInputElement> | number) => {
      setSearchRef((ref: SearchRef) => ({
        ...ref,
        [searchRefProp]: src?.target?.value ?? src,
      }));
    };

  const handleEventChange = (eventName: string, eventMetadataJSON: string) => {
    if (eventMetadataJSON === undefined) {
      return;
    }

    const metadata = JSON.parse(eventMetadataJSON);

    const { destination, ...eventData } = metadata;

    onEventChange(eventData);
    setSearchRef((ref: SearchRef) => ({
      ...ref,
      destination,
      event: {
        ...eventData,
        name: eventName,
      },
    }));
  };

  return (
    <form
      className="relative w-full md:mx-auto md:w-10/12 xl:w-9/12"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col h-[45vh] items-center text-white justify-center h-10/12 md:pb-0 md:flex-row md:justify-around md:pt-48">
        <NumberInput
          singular="person"
          plural="people"
          iconAffix="-dancing.svg"
          onUpdate={handleCommonChange("numPeople")}
        />
        <p className="mx-2 my-2 md:my-0">
          going to
        </p>
        <EventAutocomplete
          className="w-11/12 min-h-[40px] md:w-80"
          value={searchRef?.event?.name ?? ""}
          onChange={handleEventChange}
        />
        <p className="mx-2 my-2 md:my-0">
          from
        </p>
        <TextField
          className="w-11/12 min-h-[40px] md:w-48"
          type="text"
          data-name="origin"
          value={searchRef?.origin ?? ""}
          onChange={handleCommonChange("origin")}
        />
        <p className="mx-2 my-2 md:my-0">
          for up to
        </p>
        <NumberInput
          singular="night"
          plural="nights"
          iconAffix=".svg"
          onUpdate={handleCommonChange("nights")}
        />
        <button
          type="submit"
          className="flex items-center justify-center absolute w-12 h-12 -bottom-7 rounded-full bg-eggplant shadow-3xl z-30"
        >
          <img
            src="/search.svg"
            alt="Search magnifying glass"
            className="scale-75"
          />
        </button>
      </div>
    </form>
  );
};
