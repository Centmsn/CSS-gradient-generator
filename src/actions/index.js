import { SETH, SETLS, SETA, SETDEG } from "./types";

export const setH = (deg) => {
  return {
    type: SETH,
    payload: deg,
  };
};

export const setLs = (sat, light) => {
  return {
    type: SETLS,
    payload: {
      sat,
      light,
    },
  };
};

export const setA = (a) => {
  return {
    type: SETA,
    payload: a,
  };
};

export const setDeg = (deg) => {
  return {
    type: SETDEG,
    payload: deg,
  };
};
