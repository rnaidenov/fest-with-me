import { useEffect, useState } from "preact/hooks";
import { useFirstRender } from "@fe/hooks";
import { NumberInputProps } from "./types.ts";
import { imgAlt } from "./utils/img-alt.ts";

export const NumberInput = (
  { singular, plural, iconAffix, onUpdate }: NumberInputProps,
) => {
  const [count, setCount] = useState<number>(1);
  const [isSingularPluralChanged, setIsSingularPluralChanged] = useState(false);

  const firstRender = useFirstRender();

  const singularOrPlural = count === 1 ? singular : plural;
  const imgSrc = `/${singularOrPlural}${iconAffix}`;

  // TODO: e
  const handleCount = (e) => {
    const { countChange } = e.target.dataset;
    const changeBy = Number(countChange);

    setCount((currCount: number) =>
      currCount + changeBy > 0 ? currCount + changeBy : 1
    );
  };

  useEffect(() => {
    if (firstRender === false) {
      setIsSingularPluralChanged(true);
    }

    return () => {
      // TODO: Is this right?
      setTimeout(() => {
        setIsSingularPluralChanged(false);
        // TODO: Const
      }, 1000);
    };
  }, [singularOrPlural]);

  useEffect(() => {
    onUpdate(count);
  }, [count]);

  return (
    <div className="inline-flex items-center justify-center w-full h-[15%]  md:h-unset md:pt-0 md:min-w-[136px] md:w-min">
      <div className="flex flex-row-reverse md:flex-col items-center justify-center mr-4 h-24">
        <img
          className="h-1/4 hover:cursor-pointer rotate-90 md:rotate-0"
          src="/arrow-up.svg"
          alt="Arrow up"
          onClick={handleCount}
          data-count-change="1"
        />
        <img
          className={`h-1/2 ${
            isSingularPluralChanged ? "animate-flicker" : ""
          }`}
          src={imgSrc}
          alt={imgAlt(imgSrc)}
        />
        <img
          className="h-1/4 hover:cursor-pointer rotate-90 md:rotate-0"
          src="/arrow-down.svg"
          alt="Arrow down"
          onClick={handleCount}
          data-count-change="-1"
        />
      </div>
      <output className={isSingularPluralChanged ? " animate-fade-in" : ""}>
        <p className="text-white">
          {count} {singularOrPlural}
        </p>
      </output>
    </div>
  );
};
