import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

type LoaderProps = JSX.HTMLAttributes & {
  text: string;
};

const withClass = (baseClass: string, className?: string) =>
  `${baseClass}${" " + className ?? ""}`;

export const Loader = ({ text, className }: LoaderProps) => {
  const [prevText, setPrevText] = useState("");
  const [activeText, setActiveText] = useState("");

  useEffect(() => {
    setActiveText(text);

    if (activeText !== "") {
      setPrevText(activeText);
    }
  }, [text]);

  return (
    <div className={withClass("flex flex-col items-center", className)}>
      <div className="spinner" />

      <div
        className={`text-forest animate-${
          prevText === "" ? "fade-in-up" : "flicker"
        }`}
      >
        <p className="animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
};
