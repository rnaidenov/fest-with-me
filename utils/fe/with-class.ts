export const withClass = (baseClass: string, className?: string) =>
  `${baseClass}${" " + className ?? ""}`;
