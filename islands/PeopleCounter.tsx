import { useCount } from "../utils/fe/hooks/use-count.ts";
import { singularOrPlural } from "../utils/fe/singular-or-plural.ts";

// Common counter component?
export default () => {
  const [count, handleCount] = useCount();

  const personOrPeople = (count: number) =>
    singularOrPlural(count, "person", "people");

  return (
    <div className="inline-flex items-center justify-center w-full md:pt-0 md:min-w-[136px] md:w-min">
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
          src={`/${personOrPeople(count)}-dancing.svg`}
          alt={`${personOrPeople(count)} dancing`}
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
