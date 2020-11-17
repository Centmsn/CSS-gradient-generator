import { combineReducers } from "redux";

import colorPicked from "./colorPicked";
import gradientDegree from "./gradientDegree";
import activeColor from "./activeColor";
import gradientColors from "./gradientColors";
import gradientCode from "./gradientCode";
import outputMode from "./outputMode";

const reducers = combineReducers({
  colorPicked: colorPicked,
  gradient: gradientColors,
  deg: gradientDegree,
  colId: activeColor,
  code: gradientCode,
  output: outputMode,
});

export default reducers;
