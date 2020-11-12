import { SETACTIVECOL, SETACTIVEWIDTH } from "../actions/types";

const INITIAL_STATE = {
  0: {
    h: 0,
    s: 100,
    l: 50,
    a: 100,
    w: 50,
  },
  1: {
    h: 120,
    s: 100,
    l: 50,
    a: 100,
    w: 50,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETACTIVECOL:
      const { h, s, l, a, index } = action.payload;
      return { ...state, [index]: { ...state[index], h, s, l, a } };

    case SETACTIVEWIDTH:
      return {
        ...state,
        [action.payload.index]: {
          ...state[action.payload.index],
          w: action.payload.width,
        },
      };

    default:
      return state;
  }
};
