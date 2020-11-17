import { HSL, RGB } from "../actions/types";

const INITIAL_STATE = "hsl";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HSL:
      return "hsl";

    case RGB:
      return "rgb";

    default:
      return state;
  }
};
