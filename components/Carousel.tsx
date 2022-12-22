import { useState } from "preact/hooks";
import { cloneElement } from "preact";

export const Carousel = ({ children, className }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleSelect = (e: any) => {
    const { direction } = e.target.dataset;

    const itemsCount = children.length;

    const ifLeft = (idx: number) => idx === 0 ? itemsCount - 1 : idx - 1;
    const ifRight = (idx: number) => idx === itemsCount - 1 ? 0 : idx + 1;

    setActiveIdx((currIdx: number) =>
      direction === "left" ? ifLeft(currIdx) : ifRight(currIdx)
    );
  };

  return (
    <div
      className={`overflow-hidden whitespace-nowrap${" " + className ?? ""}`}
    >
      <img
        alt="Chevron left"
        data-direction="left"
        src="/chevron-left.svg"
        onClick={handleSelect}
        className="absolute h-8 w-8 left-4 top-1/2 -translate-y-1/2 z-40 hover:cursor-pointer"
      />
      <div
        className={`transition-transform duration-300
        -translate-x-[${activeIdx * 100}%] h-full`}
      >
        {children.map((child) =>
          cloneElement(child, { className: "w-full h-full" })
        )}
      </div>
      <img
        alt="Chevron right"
        src="/chevron-right.svg"
        data-direction="right"
        onClick={handleSelect}
        className="absolute h-8 w-8 right-4 top-1/2 -translate-y-1/2 z-40 hover:cursor-pointer"
      />
    </div>
  );
};
