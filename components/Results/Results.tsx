import { ResultsDesktop } from "./ResultsDesktop.tsx";
import { ResultsMobile } from "./ResultsMobile.tsx";
import { ResultsProps } from "./types.ts";

export const Results = (results: ResultsProps) => (
  <>
    <div className="h-1/2 justify-around items-center hidden sm:flex">
      <ResultsDesktop {...results} />
    </div>
    <ResultsMobile {...results} />
  </>
);
