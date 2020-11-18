import styled from "styled-components";
import { connect } from "react-redux";
import { useState, useRef, useEffect } from "react";

import Draggable from "./Draggable";
import { setA } from "../actions";

import transparentBg from "../assets/paven.png";

const TransparentOptions = ({ setA, hue, sat, light, active, gradient }) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const transparencyBar = useRef(null);

  useEffect(() => {
    const { width } = transparencyBar.current.getBoundingClientRect();
    const position = width - (width / 100) * gradient[active].a;

    setA(gradient[active].a);

    setSliderPosition(position);
  }, [active]);

  const handleManualOpacityChange = (e) => {
    const { width } = transparencyBar.current.getBoundingClientRect();

    if (e.target.value > 100 || e.target.value < 0) {
      e.target.value = 0;

      setDisplayTooltip(true);

      setTimeout(() => setDisplayTooltip(false), 3000);
    }

    setSliderPosition(width - (width / 100) * e.target.value);

    setA(e.target.value);
  };

  const setTransparency = (e) => {
    const { left, width } = transparencyBar.current.getBoundingClientRect();
    const opacity = Math.floor(100 - ((e.clientX - left) / width) * 100);

    if (e.clientX - left > width) {
      setSliderPosition(width - 6);
      setA(0);
    } else if (e.clientX - left < 0) {
      setSliderPosition(-6);
      setA(100);
    } else {
      setSliderPosition(e.clientX - left);
      setA(opacity);
    }
  };

  const tooltip = displayTooltip ? <Tooltip>Range is 0-100</Tooltip> : null;

  return (
    <>
      <Bar
        hue={hue}
        sat={sat}
        light={light}
        ref={transparencyBar}
        onClick={setTransparency}
      >
        <InnerBar />
        <Draggable func={setTransparency} left={sliderPosition} />
      </Bar>
      <Label>
        <Input
          type="number"
          min="0"
          max="100"
          value={gradient[active] ? gradient[active].a : null}
          onChange={handleManualOpacityChange}
          incorrect={displayTooltip}
        />
        opacity
        {tooltip}
      </Label>
    </>
  );
};

const Bar = styled.div.attrs(({ hue, sat, light }) => ({
  style: {
    background: `linear-gradient(90deg, hsla(${hue}, ${sat}%, ${light}%, 100%) 10%, rgba(255,255,255,0) 100%)`,
  },
}))`
  position: relative;
  grid-area: 4/2/5/3;

  border-radius: 5px;
`;

const InnerBar = styled.div`
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  background-color: white;
  background-image: url(${transparentBg});
  border-radius: 5px;
`;

const Label = styled.label`
  position: relative;
  grid-area: 5/2/6/3;

  color: gray;
  font-family: ${(props) => props.theme.mainFont};

  user-select: none;
`;

const Input = styled.input`
  width: 15%;
  min-width: 50px;

  margin-right: 2%;

  border: 2px solid
    ${(props) => (props.incorrect ? props.theme.darkRed : props.theme.darkGray)};
  border-radius: 5px;
  outline: none;
  padding: 5px;

  font-family: ${(props) => props.theme.mainFont};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  color: gray;
`;

const mapStateToProps = (state) => {
  const { hue, sat, light } = state.colorPicked;

  return {
    hue,
    sat,
    light,
    active: state.colId,
    gradient: state.gradient,
  };
};

export default connect(mapStateToProps, { setA })(TransparentOptions);
