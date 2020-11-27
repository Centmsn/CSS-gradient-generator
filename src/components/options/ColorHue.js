import { connect } from "react-redux";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import { convertHslToRgb } from "../../helpers";
import Draggable from "./Draggable";
import { setH, setLs } from "../../actions";

const ColorHue = ({ setH, setLs, setPosition, gradient, active, mode }) => {
  console.log({ mode });
  const [hueOffset, setHueOffset] = useState(null);
  const hue = useRef(null);

  useEffect(() => {
    const { width } = hue.current.getBoundingClientRect();

    setH(gradient[active].h);
    setLs(gradient[active].s, gradient[active].l);

    setHueOffset((width / 360) * gradient[active].h);
  }, [active]);

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

  const getColorCode = (char) => {
    if (!gradient[active]) return;
    const { h, s, l } = gradient[active];

    if (mode === "hsl") {
      switch (char) {
        case "h":
          return h;

        case "s":
          return s;

        case "l":
          return l;
      }
    } else {
      const { r, g, b } = convertHslToRgb(h, s, l, 0, true);

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

  const manualColorChange = (e, char) => {
    // !works for hsl not for rgb
    // !if sat > 50 && l > 50 refactor required
    // !refactor required

    const { s, l } = gradient[active];
    if (mode === "hsl") {
      switch (char) {
        case "h":
          setH(e.target.value);
          break;

        case "l":
          setLs(s, e.target.value);
          setPosition(s, e.target.value);
          break;

        case "s":
          setLs(e.target.value, l);
          setPosition(e.target.value, l);
          break;
      }
    }
  };

  return (
    <>
      <Bar ref={hue}>
        <Draggable left={hueOffset} func={setColor} />
      </Bar>
      <Wrapper>
        <Label>
          {mode === "hsl" ? "H" : "R"}
          <Input
            value={getColorCode("h")}
            onChange={(e) => manualColorChange(e, "h")}
          />
        </Label>

        <Label>
          {mode === "hsl" ? "S" : "G"}
          <Input
            value={getColorCode("s")}
            onChange={(e) => manualColorChange(e, "s")}
          />
        </Label>

        <Label>
          {mode === "hsl" ? "L" : "B"}
          <Input
            value={getColorCode("l")}
            onChange={(e) => manualColorChange(e, "l")}
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
