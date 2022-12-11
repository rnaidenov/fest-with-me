import Preact from "preact";
import { useState } from "preact/hooks";
import { Spinner } from "./Spinner.tsx";

interface BoxProps {
  children: Preact.PreactNode;
  loading?: boolean;
}

export const Box: Preact.FC<BoxProps> = (
  { children, className, loading, ...otherProps },
) => {
  const [isLoading, setIsLoading] = useState(loading);

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg ${isLoading && "animate-pulse"} ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};
