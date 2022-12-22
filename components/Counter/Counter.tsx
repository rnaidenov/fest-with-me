import { useState } from "preact/hooks";
import { useCount } from "../utils/fe/hooks/use-count.ts";
import { singularOrPlural } from "../utils/fe/singular-or-plural.ts";

// TODO:
export const Counter = ({ singular, plural }) => {
  const [count, handleCount] = useCount();

  const itemOrItems = singularOrPlural(count, singular, plural);

  return (
    <div className="inline-flex items-center">
      <div className="flex flex-row-reverse md:flex-col items-center justify-center mr-4 h-24">
        <img
          className="h-1/4 hover:cursor-pointer rotate-90 md:rotate-0"
          src="/arrow-up.svg"
          alt="Arrow up"
          onClick={handleCount}
          data-count-change="1"
        />
        <img
          className="h-1/2"
          // TODO: How do you do this?
          src={`/${itemOrItems}-dancing.svg`}
          alt={`${itemOrItems} dancing`}
        />
        <img
          className="h-1/4 hover:cursor-pointer rotate-90 md:rotate-0"
          src="/arrow-down.svg"
          alt="Arrow down"
          onClick={handleCount}
          data-count-change="-1"
        />
      </div>
      <p className="text-white">
        {count} {personOrPeople(count)}
      </p>
    </div>
  );
};
