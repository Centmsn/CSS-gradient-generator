import { connect } from "react-redux";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import { convertHslToRgb, convertRgbToHsl } from "../../helpers";
import Draggable from "./Draggable";
import { setH, setLs } from "../../actions";

const ColorHue = ({ setH, setLs, gradient, active, mode }) => {
  const [hueOffset, setHueOffset] = useState(null);
  const [rgbColor, setRgbColor] = useState({});
  const hue = useRef(null);

  useEffect(() => {
    const { width } = hue.current.getBoundingClientRect();

    setH(gradient[active].h);
    setLs(gradient[active].s, gradient[active].l);

    setHueOffset((width / 360) * gradient[active].h);
  }, [active]);

  useEffect(() => {
    const { h, s, l } = gradient[active];
    const { r, g, b } = convertHslToRgb(h, s, l, 0, true);

    setRgbColor({ r, g, b });
    // !gradient genrates problems but allows to update colors
  }, [mode, active]);

  const setColor = (e) => {
    const { left, width } = hue.current.getBoundingClientRect();

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

  const setColorValue = (e, char) => {
    // !triple color conversion

    if (mode === "hsl") {
      switch (char) {
        case "h":
          setH(e.target.value);
          break;

        case "s":
          setLs(e.target.value, gradient[active].l);
          break;

        case "l":
          setLs(gradient[active].s, e.target.value);
          break;
      }
    } else {
      let rgbChar, currentHsl;
      const value = parseInt(e.target.value);

      switch (char) {
        case "h":
          rgbChar = "r";
          currentHsl = convertRgbToHsl(value, rgbColor.g, rgbColor.b, true);
          break;

        case "s":
          rgbChar = "g";
          currentHsl = convertRgbToHsl(rgbColor.r, value, rgbColor.b, true);
          break;

        case "l":
          rgbChar = "b";
          currentHsl = convertRgbToHsl(rgbColor.r, rgbColor.g, value, true);
          break;
      }
      setRgbColor((prev) => ({ ...prev, [rgbChar]: value }));

      setH(Math.round(currentHsl.h));
      setLs(Math.round(currentHsl.s), Math.round(currentHsl.l));
    }
  };

  const getColorValue = (char) => {
    if (!gradient[active]) return;

    if (mode === "hsl") {
      return gradient[active][char];
    } else {
      const { r, g, b } = rgbColor;

      switch (char) {
        case "h":
          return r;
        case "s":
          return g;
        case "l":
          return b;
      }
    }
  };

  const descHR = mode === "hsl" ? "H" : "R";
  const descSG = mode === "hsl" ? "S" : "G";
  const descLB = mode === "hsl" ? "L" : "B";

  return (
    <>
      <Bar ref={hue} onClick={setColor}>
        <Draggable left={hueOffset} func={setColor} />
      </Bar>
      <Wrapper>
        <Label>
          {descHR}
          <Input
            value={getColorValue("h")}
            onChange={(e) => setColorValue(e, "h")}
          />
        </Label>

        <Label>
          {descSG}
          <Input
            value={getColorValue("s")}
            onChange={(e) => setColorValue(e, "s")}
          />
        </Label>

        <Label>
          {descLB}
          <Input
            value={getColorValue("l")}
            onChange={(e) => setColorValue(e, "l")}
          />
        </Label>
      </Wrapper>
    </>
  );
};

const Bar = styled.div`
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

const Input = styled.input.attrs(() => ({
  type: "number",
  min: 0,
  max: 255,
}))`
  width: 75%;

  font-family: ${(props) => props.theme.mainFont};

  border: 2px solid ${(props) => props.theme.darkGray};
  border-radius: 5px;
  outline: none;
  padding: 3px;

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Wrapper = styled.div`
  grid-area: 3/2/4/3;

  display: flex;
`;

const Label = styled.label`
  color: gray;
  font-family: ${(props) => props.theme.mainFont};
  user-select: none;
`;

const mapStateToProps = (state) => {
  return {
    active: state.colId,
    gradient: state.gradient,
    mode: state.output,
  };
};

export default connect(mapStateToProps, { setH, setLs })(ColorHue);
