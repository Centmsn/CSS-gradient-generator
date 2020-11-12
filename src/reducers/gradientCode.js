import { SETGRADIENTCODE } from "../actions/types";

const INITIAL_STATE =
  "linear-gradient(90deg, hsla(0, 100%, 50%, 100%), hsla(120, 100%, 50%, 100%))";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETGRADIENTCODE:
      return action.payload;
    default:
      return state;
  }
};
