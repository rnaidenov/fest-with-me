import { useState } from "preact/hooks";

export const useCount = () => {
  const [count, setcount] = useState<number>(1);

  const handleCount = (e) => {
    const { countChange } = e.target.dataset;
    const changeBy = Number(countChange);

    setcount((currCount: number) =>
      currCount + changeBy > 0 ? currCount + changeBy : 1
    );
  };

  return [count, handleCount];
};
