import { SWITCHORDER } from "../actions/types";

const INITIAL_STATE = [0, 1];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCHORDER:
      return action.payload;

    default:
      return state;
  }
};
