export const singularOrPlural = (
  count: number,
  singular: string,
  plural: string,
) => count === 1 ? singular : plural;
