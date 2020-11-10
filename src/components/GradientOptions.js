import { useState, useRef } from "react";
import styled from "styled-components";

import Draggable from "./Draggable";

const GradientOptions = () => {
  const [colorsAmount, setColorsAmount] = useState(2);
  const bar = useRef(null);

  const startSlide = (e) => {
    document.addEventListener("mouseup", stopSlide);
    document.addEventListener("mousemove", changeColorPosition);
  };

  const stopSlide = () => {
    document.removeEventListener("mousemove", changeColorPosition);
    document.removeEventListener("mouseup", stopSlide);
  };

  const changeColorPosition = (e) => {
    const { left, width } = e.target.parentNode.getBoundingClientRect();
    console.log(e.target);
    e.target.style.left = `${e.clientX - left + 10}px`;
  };

  const addGradientColor = (e) => {
    setColorsAmount((prev) => prev + 1);
  };

  const generateSliders = () => {
    const sliders = [];

    for (let i = 0; i < colorsAmount; i++) {
      sliders.push(
        <Draggable key={i} onMouseDown={startSlide} left={50 * i + 20} />
      );
    }

    return sliders;
  };

  return (
    <Bar onClick={addGradientColor} ref={bar}>
      {generateSliders()}
    </Bar>
  );
};

export default GradientOptions;

const Bar = styled.div`
  position: relative;
  grid-area: 8/1/10/4;

  border: 2px solid black;
  border-radius: 5px;

  cursor: pointer;
`;

// const Slider = styled.div.attrs(({ left }) => ({
//   style: {
//     left: left,
//   },
// }))`
//   z-index: 999;
//   position: absolute;
//   transform: translateY(-10%);

//   height: 125%;
//   width: 20px;
//   border: 2px solid black;
//   border-radius: 5px;

//   background-color: black;
// `;
