import { combineReducers } from "redux";

import colorPicked from "./colorPicked";
import gradientDegree from "./gradientDegree";
import activeColor from "./activeColor";
import gradientColors from "./gradientColors";
import gradientCode from "./gradientCode";
import outputMode from "./outputMode";
import colorOrder from "./colorOrder";
import colorWidth from "./colorWidth";

const reducers = combineReducers({
  colorPicked: colorPicked,
  gradient: gradientColors,
  deg: gradientDegree,
  colId: activeColor,
  code: gradientCode,
  output: outputMode,
  order: colorOrder,
  width: colorWidth,
});

export default reducers;
