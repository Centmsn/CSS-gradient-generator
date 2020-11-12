import styled from "styled-components";
import { connect } from "react-redux";
import { useState, useRef } from "react";

import { changeActiveCol, setActiveWidth, setActiveCol } from "../actions";
import Draggable from "./Draggable";

const GradientOptions = ({
  hue,
  light,
  sat,
  alpha,
  active,
  gradient,
  changeActiveCol,
  setActiveWidth,
  setActiveCol,
}) => {
  const [colorsAmount, setColorsAmount] = useState(1);
  const [colorsPosition, setColorsPosition] = useState({
    0: { x: 20 },
    1: { x: 70 },
  });
  const gradientBar = useRef(null);

  const changeColorPosition = (e, index) => {
    changeActiveCol(index);
    const { width, left } = gradientBar.current.getBoundingClientRect();

    setColorsPosition((prev) => ({
      ...prev,
      [index]: { x: e.clientX - left + 10 },
    }));
    setActiveWidth(Math.round((e.clientX - left + 10) * (100 / width)), index);
  };

  const addGradientColor = (e) => {
    const { left } = gradientBar.current.getBoundingClientRect();
    if (e.target !== gradientBar.current) return;
    setColorsAmount((prev) => prev + 1);

    setColorsPosition((prev) => {
      return { ...prev, [colorsAmount + 1]: { x: e.clientX - left - 10 } };
    });

    setActiveCol({ index: colorsAmount + 1, h: 0, s: 100, l: 50, a: 100 });
  };

  const generateSliders = () => {
    const sliders = [];
    for (let i = 0; i <= colorsAmount; i++) {
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
      hue={hue}
      light={light}
      alpha={alpha}
      sat={sat}
      ref={gradientBar}
    >
      {generateSliders()}
    </Bar>
  );
};

const Bar = styled.div.attrs((props) => ({
  style: {
    background: `linear-gradient(90deg, hsla(${props.hue}, ${props.sat}%, ${props.light}%, ${props.alpha}%) 16%, rgba(13,101,191,1) 62%)`,
  },
}))`
  position: relative;
  grid-area: 8/1/10/4;

  border: 2px solid black;
  border-radius: 5px;

  cursor: pointer;
`;

const mapStateToProps = (state) => {
  const { hue, sat, light, alpha } = state.colorPicked;

  return {
    hue,
    sat,
    light,
    alpha,
    deg: state.deg,
    active: state.colId,
    gradient: state.gradient,
  };
};

export default connect(mapStateToProps, {
  changeActiveCol,
  setActiveWidth,
  setActiveCol,
})(GradientOptions);
