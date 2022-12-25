import { useEffect, useRef, useState } from "preact/hooks";
import { handleKeyDown } from "./utils/index.ts";
import { KEYS_TO_HANDLE } from "./consts.ts";

export const TextField = (props) => {
  const [value, setValue] = useState();
  // TODO: Proper type
  const [lastFocused, setLastFocused] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // TODO: useTextFieldHelpers(), for example..
  const textFieldWrap = useRef(null);

  const handleFocusOut = () => setShowSuggestions(false);

  const shouldShowAutocomplete = props.autocomplete &&
    props.suggestions?.length > 0 && showSuggestions;

  const onSelect = () => {
    const focusedEl = document.activeElement;

    setValue(focusedEl.textContent);
    setLastFocused(focusedEl);
    handleFocusOut();

    props.onChange?.(
      focusedEl.textContent,
      focusedEl.dataset.sugggestionMetadata,
    );
  };

  useEffect(() => {
    if (showSuggestions) {
      const suggestions = [...textFieldWrap?.current.querySelectorAll("li")];

      suggestions[lastFocused?.dataset.index]?.focus();
    }
  }, [showSuggestions]);

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (
        !props.suggestions?.length ||
        !KEYS_TO_HANDLE.includes(e.key)
      ) return;

      handleKeyDown(e, onSelect, handleFocusOut);
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [props.suggestions?.length]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!textFieldWrap?.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClick);

    // TODO: Why u do this??
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className={`relative${" " + props.className ?? ""}`}>
      <input
        ref={textFieldWrap}
        {...props}
        type="text"
        placeholder={props.label ?? ""}
        onFocus={() => setShowSuggestions(true)}
        value={value}
        // data-metadata={ }
        // onBlur={() => setIsFocused(false)}
        className={`mt-1 h-10 block w-full text-black rounded${
          shouldShowAutocomplete ? "-t" : ""
        }-lg hover:border-green-50 px-4 sm:text-sm drop-shadow-xl shadow-black :focus-visible-border-0`}
      />

      {shouldShowAutocomplete &&
        (
          <ul className="suggestions bg-white absolute w-full z-40">
            {props.suggestions.map((suggestion, idx) => (
              <li
                tabIndex={0}
                data-index={idx}
                data-sugggestion-metadata={suggestion.metadata}
                className={`text-black p-2`}
                onClick={() => onSelect()}
                onFocus={(e) => console.log(`${e.target.value} is focused.`)}
              >
                {suggestion?.key}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};
