import {
  SETH,
  SETLS,
  SETA,
  SETDEG,
  SETACTIVECOL,
  CHANGEACTIVECOL,
  SETACTIVEWIDTH,
  SETGRADIENTCODE,
  REMOVEGRADIENTCOL,
  SWITCHORDER,
  SETCOLORWIDTH,
  UNSETCOLORWIDTH,
  RGB,
  HSL,
} from "./types";

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

export const setActiveCol = (value) => {
  return {
    type: SETACTIVECOL,
    payload: value,
  };
};

export const changeActiveCol = (index) => {
  return {
    type: CHANGEACTIVECOL,
    payload: index,
  };
};

export const setActiveWidth = (width, index) => {
  return {
    type: SETACTIVEWIDTH,
    payload: { index, width },
  };
};

export const setGradientCode = (code) => {
  return {
    type: SETGRADIENTCODE,
    payload: code,
  };
};

export const removeGradientCol = (index) => {
  return {
    type: REMOVEGRADIENTCOL,
    payload: index,
  };
};

export const switchToRgb = () => {
  return {
    type: RGB,
  };
};

export const switchToHsl = () => {
  return {
    type: HSL,
  };
};

export const reorderColors = (object, current, index) => {
  const keys = Object.keys(object);
  object[index].x = current;

  keys.sort((a, b) => (object[a].x > object[b].x ? 1 : -1));

  return {
    type: SWITCHORDER,
    payload: keys,
  };
};

export const setColorWidth = (width, index) => {
  return {
    type: SETCOLORWIDTH,
    payload: { width, index },
  };
};

export const unsetColorWidth = (index) => {
  return {
    type: UNSETCOLORWIDTH,
    payload: index,
  };
};
