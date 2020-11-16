import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

import { setH, setLs } from "../actions";
import Draggable from "./Draggable";
import DegreeOptions from "./DegreeOptions";
import GradientOptions from "./GradientOptions";
import ColorsList from "./ColorsList";
import TransparentOptions from "./TransparentOptions";

const Options = ({ setH, setLs, hue, active, gradient }) => {
  const colorHue = useRef(null);
  const colorSat = useRef(null);
  const satSelector = useRef(null);

  const [hueOffset, setHueOffset] = useState(null);
  const [satPosition, setSatPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const { width } = colorHue.current.getBoundingClientRect();
    const satDimensions = colorSat.current.getBoundingClientRect();

    setH(gradient[active].h);
    setLs(gradient[active].s, gradient[active].l);

    setHueOffset((width / 360) * gradient[active].h);

    setSatPosition({
      x: (satDimensions.width / 100) * gradient[active].s - 7.5,
      y:
        satDimensions.height -
        (satDimensions.height / 100) *
          gradient[active].l *
          (1 + gradient[active].s / 100) -
        7.5,
    });
  }, [active]);

  const setColor = (e) => {
    const { left, width } = colorHue.current.getBoundingClientRect();

    if (e.clientX - left > width) {
      setHueOffset(width - 6);
      setH(360);
    } else if (e.clientX - left < 0) {
      setHueOffset(-6);
      setH(0);
    } else {
      setHueOffset(e.clientX - left - 6.5);
      setH((e.clientX - left) * (360 / width));
    }
  };

  const setSaturation = () => {
    document.addEventListener("mousemove", startSaturationSlide);
    document.addEventListener("mouseup", stopSaturationSlide);
  };

  const startSaturationSlide = (e) => {
    const {
      left,
      top,
      width,
      height,
    } = satSelector.current.parentNode.getBoundingClientRect();

    if (
      e.clientX - left > width ||
      e.clientX - left < 0 ||
      e.clientY - top > height ||
      e.clientY - top < 0
    ) {
      return;
    } else {
      const xLight = 2 - (e.clientX - left) / width;
      const yLight = 100 - ((e.clientY - top) / height) * 100;

      setSatPosition({ x: e.clientX - left - 7.5, y: e.clientY - top - 7.5 });

      setLs(((e.clientX - left) / width) * 100, (yLight / 2) * xLight);
    }
  };

  const stopSaturationSlide = () => {
    document.removeEventListener("mousemove", startSaturationSlide);
    document.removeEventListener("mouseup", stopSaturationSlide);
  };

  return (
    <Settings>
      <ColorPicker deg={hue} ref={colorSat}>
        <ColorPickerSelector
          onMouseDown={setSaturation}
          ref={satSelector}
          left={satPosition.x}
          top={satPosition.y}
        />
        <BlackGradient />
      </ColorPicker>
      <ColorHue ref={colorHue}>
        <Draggable left={hueOffset} func={setColor} />
      </ColorHue>
      <TransparentOptions />
      <DegreeOptions />
      <GradientOptions />
      <ColorsList />
    </Settings>
  );
};

const Settings = styled.div`
  z-index: 999;
  margin-top: 20vh;
  flex-basis: 75%;
  height: 60%;

  display: grid;
  gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(10, 1fr);

  border-radius: 5px;
  background-color: white;
  padding: 10px;
`;

const ColorPicker = styled.div.attrs(({ deg }) => ({
  style: {
    background: `linear-gradient(
      90deg,
      hsl(360, 0%, 100%) 0%,
      hsl(${deg}, 100%, 50%) 100%
    )`,
  },
}))`
  position: relative;
  grid-area: 2/1/7/2;

  border-radius: 5px;
`;

const BlackGradient = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  border-radius: 5px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 8%,
    rgba(0, 0, 0, 1) 90%
  );
`;

const ColorHue = styled.div`
  position: relative;
  grid-area: 2/2/3/3;

  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 1%,
    rgba(255, 252, 0, 1) 20%,
    rgba(0, 255, 7, 1) 30%,
    rgba(0, 254, 255, 1) 50%,
    rgba(0, 31, 255, 1) 60%,
    rgba(252, 0, 255, 1) 85%,
    rgba(255, 0, 0, 1) 95%
  );
  border-radius: 5px;
`;

const ColorPickerSelector = styled.div.attrs((props) => ({
  style: {
    left: props.left,
    top: props.top,
  },
}))`
  position: absolute;
  z-index: 1000;

  width: 20px;
  height: 20px;

  border: 2px solid white;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px black;
  cursor: pointer;
`;

const mapStateToProps = (state) => {
  return {
    hue: state.colorPicked.hue,
    active: state.colId,
    gradient: state.gradient,
  };
};

export default connect(mapStateToProps, { setH, setLs })(Options);
