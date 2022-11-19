import { useState } from 'preact/hooks';
import { PageProps } from "$fresh/server.ts";
import { TextField } from '../components/TextField/TextField.tsx';


export default (props: PageProps) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = async (e) => {
    const query = e.target.value;

    if (!query.length) {
      setSuggestions([]);
      return;
    }

    const data = await fetch('/api/search/ra', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query })
    }).then(res => res.json());

    const normalizeData = (data) =>
      data.map(({ name, ...metdata }) => ({ key: name, metadata: JSON.stringify(metdata) }));

    setSuggestions(normalizeData(data));
  }

  // TODO: test on empty input
  return (
    <TextField
      {...props}
      autocomplete
      onInput={handleInput}
      suggestions={suggestions}
      onChange={props.onChange}
    />
  )
}
