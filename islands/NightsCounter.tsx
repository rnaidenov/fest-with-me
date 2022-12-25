import { singularOrPlural } from "../utils/fe/singular-or-plural.ts";
import { useCount } from "../utils/fe/hooks/use-count.ts";

export default () => {
  const [count, handleCount, pluralOrSingular, isPluralSingularChanged] =
    useCount("night", "nights");

  return (
    <div className="inline-flex items-center justify-center w-full h-[15%] md:h-unset md:min-w-[136px] md:w-min">
      <div className="flex flex-row-reverse md:flex-col items-center justify-center mr-4 h-24">
        <img
          className="h-1/4 hover:cursor-pointer rotate-90 md:rotate-0"
          src="/arrow-up.svg"
          alt="Arrow up"
          onClick={handleCount}
          data-count-change="1"
        />
        <img
          className={`h-1/2 ${isPluralSingularChanged && "animate-flicker"}`}
          src={`/${pluralOrSingular}.svg`}
          alt="Day or night"
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
        {count} {pluralOrSingular}
      </p>
    </div>
  );
};
