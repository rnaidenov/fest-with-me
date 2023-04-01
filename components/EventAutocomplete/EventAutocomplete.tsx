import { useState } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import { TextField } from "../TextField/TextField.tsx";
import { EventData } from "../../types.ts";
import { normalizeEventData } from "./utils/normalize-event-data.ts";
import { EventAutocompleteProps } from "./types.ts";

export const EventAutocomplete = (props: EventAutocompleteProps) => {
  console.log("🚀 ~ file: EventAutocomplete.tsx:7 ~ props:", props.value);
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = async (e) => {
    const query = e.target.value;

    if (!query.length) {
      setSuggestions([]);
      return;
    }

    const data = await fetch("/api/search/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());

    setSuggestions(normalizeEventData(data));
  };

  return (
    <TextField
      {...props}
      autocomplete
      onInput={handleInput}
      suggestions={suggestions}
    />
  );
};
