export const imgAlt = (imgSrc: string) =>
  imgSrc.split("/")[1].split(".")[0].replace(/-/g, " ").toLowerCase();
