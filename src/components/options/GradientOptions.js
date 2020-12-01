import styled from "styled-components";
import { connect } from "react-redux";
import { useRef, useEffect } from "react";
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

  useEffect(() => {
    // current colors position
    const index = Object.keys(colorsWidth).length - 1;

    // switch color order when color position is changed
    reorderColors(colorsWidth, colorsWidth[index].x, index);
  }, [colorsWidth]);

  useEffect(() => {
    const { width } = gradientBar.current.getBoundingClientRect();
    // set initial color position
    setColorWidth(25, 0);
    setColorWidth(width - 25 - 20, 1);

    // set initial color width
    setActiveWidth(1, 0);
    setActiveWidth(95, 1);
  }, []);

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
    // if draggable element is clicked -> return
    if (e.target !== gradientBar.current) return;

    const { left, width } = gradientBar.current.getBoundingClientRect();

    // sets color position based on cursor position
    setColorWidth(e.clientX - left - 10, colorsAmount);

    // adds new color - red by default
    setActiveCol({ index: colorsAmount, h: 0, s: 100, l: 50, a: 100 });

    // sets color width based on cursor position
    setActiveWidth(
      Math.round(((e.clientX - left - 10) / width) * 100),
      colorsAmount
    );

    // switch active color to newly generated
    changeActiveCol(colorsAmount);
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
      //  gradient bar always keeps 90deg to represent colors placement
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
