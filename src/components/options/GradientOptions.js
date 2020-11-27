import styled from "styled-components";
import { connect } from "react-redux";
import { useRef } from "react";
import _ from "lodash";

import {
  changeActiveCol,
  setActiveWidth,
  setActiveCol,
  reorderColors,
  setColorWidth,
} from "../../actions";
import Draggable from "./Draggable";

const GradientOptions = (props) => {
  const {
    active,
    gradient,
    changeActiveCol,
    setActiveWidth,
    setActiveCol,
    reorderColors,
    code,
    colorsWidth,
    setColorWidth,
  } = props;

  const gradientBar = useRef(null);
  const colorsAmount = Object.keys(gradient).length;
  // !colors position doesnt change on color remove

  const changeColorPosition = (e, index) => {
    changeActiveCol(index);
    const { width, left } = gradientBar.current.getBoundingClientRect();

    if (e.clientX - left + 10 > width || e.clientX - left < -10) {
      return;
    }

    setActiveWidth(Math.round((e.clientX - left + 10) * (100 / width)), index);

    reorderColors(colorsWidth, e.clientX - left - 10, index);
    setColorWidth(e.clientX - left - 10, index);
  };

  const addGradientColor = (e) => {
    if (e.target !== gradientBar.current) return;
    const { left } = gradientBar.current.getBoundingClientRect();

    setColorWidth(e.clientX - left - 10, colorsAmount);
    setActiveCol({ index: colorsAmount, h: 0, s: 100, l: 50, a: 100 });

    // TODO: replace with proper value
    // TODO: adding color doesnt reorder colors
    setActiveWidth(1, colorsAmount);
  };

  const generateSliders = () => {
    const sliders = [];

    for (let i = 0; i <= colorsAmount - 1; i++) {
      if (i >= Object.keys(gradient).length) return;

      const sliderCol = `hsl(${gradient[i].h}, ${gradient[i].s}%, ${gradient[i].l}%)`;

      sliders.push(
        <Draggable
          key={i}
          left={colorsWidth[i].x}
          func={(e) => changeColorPosition(e, i)}
          clickFunc={() => changeActiveCol(i)}
          active={i === active ? true : false}
          wide
          color={sliderCol}
        />
      );
    }

    return sliders;
  };

  return (
    <Bar
      onMouseDown={addGradientColor}
      ref={gradientBar}
      //  gradient bar always keeps 90deg
      // to represent colors placement
      color={code.replace(/\d{1,3}deg/gi, "90deg")}
    >
      {generateSliders()}
    </Bar>
  );
};

const Bar = styled.div.attrs((props) => ({
  style: {
    background: props.color,
  },
}))`
  position: relative;
  grid-area: 8/1/10/4;

  border: 2px solid ${(props) => props.theme.darkGray};
  border-radius: 5px;

  cursor: pointer;

  &:hover {
    &::after {
      content: "Click to add color";
      position: absolute;
      right: 0;
      top: 120%;

      border: 2px solid ${(props) => props.theme.darkGray};
      border-radius: 5px;

      color: gray;
      font-family: "Inconsolata", monospace;
      padding: 5px;
    }
  }
`;

const mapStateToProps = (state) => {
  const { deg, colId, gradient, code } = state;

  return {
    deg,
    active: colId,
    gradient,
    code,
    colorsWidth: state.width,
  };
};

export default connect(mapStateToProps, {
  changeActiveCol,
  setActiveWidth,
  setActiveCol,
  reorderColors,
  setColorWidth,
})(GradientOptions);
