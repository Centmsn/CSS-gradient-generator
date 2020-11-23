import _ from "lodash";
import { SETCOLORWIDTH, UNSETCOLORWIDTH } from "../actions/types";

const INITIAL_STATE = {
  0: { x: 20 },
  1: { x: 70 },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETCOLORWIDTH:
      const { width, index } = action.payload;

      return { ...state, [index]: { x: width } };

    case UNSETCOLORWIDTH:
      const prevState = _.omit({ ...state }, action.payload);
      const keys = Object.keys(prevState);

      const newState = {};

      for (let i = 0; i < keys.length; i++) {
        newState[i] = prevState[keys[i]];
      }

      console.log(newState);

      return newState;

    default:
      return state;
  }
};
