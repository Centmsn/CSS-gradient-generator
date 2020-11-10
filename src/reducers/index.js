import { combineReducers } from "redux";

import colorPicked from "./colorPicked";
import gradientDegree from "./gradientDegree";

const reducers = combineReducers({
  colorPicked: colorPicked,
  deg: gradientDegree,
});

export default reducers;
