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
    <>
      <input
        ref={textFieldWrap}
        {...props}
        type="text"
        placeholder={props.label ?? ""}
        onFocus={() => setShowSuggestions(true)}
        value={value}
        // data-metadata={ }
        // onBlur={() => setIsFocused(false)}
        className={`mt-1 h-10 block w-full rounded-lg hover:border-green-50 px-4 sm:text-sm drop-shadow-xl shadow-black${
          " " + props.className ?? ""
        }`}
      />

      {props.autocomplete && props.suggestions?.length > 0 && showSuggestions &&
        (
          <ul className="suggestions bg-purple-200 absolute w-full">
            {props.suggestions.map((suggestion, idx) => (
              <li
                tabIndex={0}
                data-index={idx}
                data-sugggestion-metadata={suggestion.metadata}
                className={`focus:bg-red-200`}
                onClick={() => onSelect()}
                onFocus={(e) => console.log(`${e.target.value} is focused.`)}
              >
                {suggestion?.key}
              </li>
            ))}
          </ul>
        )}
    </>
  );
};
