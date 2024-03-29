import { useEffect, useState } from "preact/hooks";
import { ResultsDesktop } from "./ResultsDesktop.tsx";
import { ResultsMobile } from "./ResultsMobile.tsx";
import { ResultsProps } from "./types.ts";

export const Results = (results: Omit<ResultsProps, "onPriceUpdate">) => {
  const [resultsData, setResultsData] = useState(results);

  const handlePriceUpdate =
    (prop: keyof Omit<ResultsProps, "currency">) => (newPrice: number) => {
      // TODO:
      setResultsData((prevResults: any) => ({
        ...prevResults,
        [prop]: {
          ...prevResults[prop],
          price: Number(newPrice),
        },
      }));
    };

  useEffect(() => {
    setResultsData(results);
  }, [results]);

  return (
    <>
      <div className="h-1/2 justify-around items-center hidden md:flex">
        <ResultsDesktop {...resultsData} onPriceUpdate={handlePriceUpdate} />
      </div>
      <ResultsMobile {...resultsData} onPriceUpdate={handlePriceUpdate} />
    </>
  );
};
