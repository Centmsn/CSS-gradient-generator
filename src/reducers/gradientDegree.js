import { SETDEG } from "../actions/types";

const INITIAL_STATE = 90;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETDEG:
      return parseInt(action.payload);
    default:
      return state;
  }
};
