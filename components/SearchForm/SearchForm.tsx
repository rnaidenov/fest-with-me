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

  // TODO: Move to utils
  const lookUpVenue = async (venueId: string) => {
    console.log(
      "🚀 ~ file: SearchForm.tsx:22 ~ lookUpVenue ~ venueId:",
      venueId,
    );
    // TODO: Try, catch
    return await fetch(`/api/search/events?venueId=${venueId}`).then((res) =>
      res.json()
    );
  };

  const handleEventChange = async (
    eventName: string,
    eventMetadataJSON: string,
  ) => {
    if (eventMetadataJSON === undefined) {
      return;
    }

    const metadata = JSON.parse(eventMetadataJSON);

    const { venueId, ...eventData } = metadata;

    const venue = await lookUpVenue(venueId);

    onEventChange(eventData);
    setSearchRef((ref: SearchRef) => ({
      ...ref,
      destination: {
        geo: venue.geo,
        address: venue.address,
      },
      event: {
        ...eventData,
        name: eventName,
      },
    }));
  };

  return (
    <form
      className="relative w-full md:mx-auto md:w-10/12 xl:w-9/12"
      onSubmit={(e: SubmitEvent) => {
        e.preventDefault();
        onSubmit(searchRef);
      }}
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
          placeholder="artist, event or venue"
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
          placeholder="e.g. London, UK"
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
          className="flex items-center justify-center absolute w-12 h-12 -bottom-7 rounded-[33%] bg-gradient-to-b from-[#ecfff1] to-[#5e4b4b] shadow-3xl z-30 transition-all duration-700 hover:scale-[1.05]"
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
