import { combineReducers } from "redux";

import colorPicked from "./colorPicked";
import gradientDegree from "./gradientDegree";
import activeColor from "./activeColor";
import gradientColors from "./gradientColors";

const reducers = combineReducers({
  colorPicked: colorPicked,
  gradient: gradientColors,
  deg: gradientDegree,
  colId: activeColor,
});

export default reducers;
