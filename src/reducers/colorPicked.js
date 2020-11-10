import { SETH, SETLS, SETA } from "../actions/types";

const INITIAL_STATE = { hue: 0, sat: 100, light: 50, alpha: 100 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETH:
      const hue = Math.round(action.payload);

      return { ...state, hue };

    case SETLS:
      const { sat, light } = action.payload;
      return { ...state, sat: Math.round(sat), light: Math.round(light) };

    case SETA:
      return { ...state, alpha: action.payload };

    default:
      return state;
  }
};
