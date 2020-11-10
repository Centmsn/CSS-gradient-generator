import { combineReducers } from "redux";

import colorPicked from "./colorPicked";

const reducers = combineReducers({
  colorPicked: colorPicked,
});

export default reducers;
