import { useEffect, useState } from "preact/hooks";
import { useFirstRender } from "./use-first-render.ts";
import { singularOrPlural as singularOrPluralFn } from "../singular-or-plural.ts";

export const useCount = (singular: string, plural: string) => {
  const [count, setcount] = useState<number>(1);
  const [isPluralSingularChanged, setIsPluralSingularChanged] = useState(false);

  const firstRender = useFirstRender();

  const singularOrPlural = singularOrPluralFn(count, singular, plural);

  // TODO: e
  const handleCount = (e) => {
    const { countChange } = e.target.dataset;
    const changeBy = Number(countChange);

    setcount((currCount: number) =>
      currCount + changeBy > 0 ? currCount + changeBy : 1
    );
  };

  useEffect(() => {
    if (firstRender === false) {
      setIsPluralSingularChanged(true);
    }

    return () => {
      // TODO: Is this right?
      setTimeout(() => {
        setIsPluralSingularChanged(false);
        // TODO: Const
      }, 1000);
    };
  }, [singularOrPlural]);

  return [count, handleCount, singularOrPlural, isPluralSingularChanged];
};
