import _ from "lodash";
import {
  SETACTIVECOL,
  SETACTIVEWIDTH,
  REMOVEGRADIENTCOL,
} from "../actions/types";

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

    case REMOVEGRADIENTCOL:
      const prevState = _.omit({ ...state }, action.payload);
      const newState = {};

      const keys = Object.keys(prevState);

      for (let i = 0; i < keys.length; i++) {
        newState[i] = prevState[keys[i]];
      }

      return newState;

    default:
      return state;
  }
};
