import { CHANGEACTIVECOL } from "../actions/types";

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGEACTIVECOL:
      return action.payload;
    default:
      return state;
  }
};
