import styled from "styled-components";
import { connect } from "react-redux";
import { useState, useRef, useEffect } from "react";

import { changeActiveCol, setActiveWidth, setActiveCol } from "../actions";
import Draggable from "./Draggable";

const GradientOptions = ({
  active,
  gradient,
  changeActiveCol,
  setActiveWidth,
  setActiveCol,
  code,
}) => {
  const [colorsAmount, setColorsAmount] = useState(1);
  const [colorsPosition, setColorsPosition] = useState({
    0: { x: 20 },
    1: { x: 70 },
  });
  const gradientBar = useRef(null);

  useEffect(() => {
    setColorsAmount(Object.keys(gradient).length - 1);
  }, [gradient]);

  const changeColorPosition = (e, index) => {
    changeActiveCol(index);
    const { width, left } = gradientBar.current.getBoundingClientRect();

    if (e.clientX - left + 10 > width || e.clientX - left < -10) {
      return;
    }

    setColorsPosition((prev) => ({
      ...prev,
      [index]: { x: e.clientX - left - 10 },
    }));
    setActiveWidth(Math.round((e.clientX - left + 10) * (100 / width)), index);
  };

  const addGradientColor = (e) => {
    if (e.target !== gradientBar.current) return;
    const { left } = gradientBar.current.getBoundingClientRect();

    setColorsAmount((prev) => prev + 1);
    setColorsPosition((prev) => {
      return { ...prev, [colorsAmount + 1]: { x: e.clientX - left - 10 } };
    });
    setActiveCol({ index: colorsAmount + 1, h: 0, s: 100, l: 50, a: 100 });
    // *test
    setActiveWidth(1, colorsAmount + 1);
  };

  const generateSliders = () => {
    const sliders = [];

    for (let i = 0; i <= colorsAmount; i++) {
      if (i >= Object.keys(gradient).length) return;

      const sliderCol = `hsl(${gradient[i].h}, ${gradient[i].s}%, ${gradient[i].l}%)`;

      sliders.push(
        <Draggable
          key={i}
          left={colorsPosition[i].x}
          func={(e) => changeColorPosition(e, i)}
          clickFunc={() => changeActiveCol(i)}
          active={i === active ? true : false}
          wide="true"
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
      color={code.replace(/\d{2,3}deg/gi, "90deg")}
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

  border-radius: 5px;

  cursor: pointer;

  &:hover {
    &::after {
      content: "Click to add color";
      position: absolute;
      left: 85%;
      top: 120%;

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
  };
};

export default connect(mapStateToProps, {
  changeActiveCol,
  setActiveWidth,
  setActiveCol,
})(GradientOptions);
