import { connect } from "react-redux";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import { convertHslToRgb, convertRgbToHsl } from "../../helpers";
import Draggable from "./Draggable";
import { setH, setLs } from "../../actions";
import Tooltip from "./Tooltip";

const ColorHue = ({ setH, setLs, gradient, active, mode }) => {
  const [hueOffset, setHueOffset] = useState(null);
  const [rgbColor, setRgbColor] = useState({});
  const [tooltipText, setTooltipText] = useState("");
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
    let val = parseInt(e.target.value);

    if (mode === "hsl") {
      if ((val > 360 || val < 0) && char === "h") {
        val = 360;
        setTooltipText("Range is 0-360");
      } else if ((val > 100 || val < 0) && char !== "h") {
        val = 100;
        setTooltipText("Range is 0-100");
      }

      switch (char) {
        case "h":
          setH(val);
          break;

        case "s":
          setLs(val, gradient[active].l);
          break;

        case "l":
          setLs(gradient[active].s, val);
          break;
      }
    } else {
      let rgbChar, currentHsl;
      if (val > 255 || val < 0) {
        val = 255;

        setTooltipText("Range is 0-255");
      }

      switch (char) {
        case "h":
          rgbChar = "r";
          currentHsl = convertRgbToHsl(val, rgbColor.g, rgbColor.b, true);
          break;

        case "s":
          rgbChar = "g";
          currentHsl = convertRgbToHsl(rgbColor.r, val, rgbColor.b, true);
          break;

        case "l":
          rgbChar = "b";
          currentHsl = convertRgbToHsl(rgbColor.r, rgbColor.g, val, true);
          break;
      }
      setRgbColor((prev) => ({ ...prev, [rgbChar]: val }));

      setH(Math.round(currentHsl.h));
      setLs(Math.round(currentHsl.s), Math.round(currentHsl.l));
    }

    if (tooltipText) {
      // !tooltip timeout is set after each input change
      setTimeout(() => {
        setTooltipText("");
      }, 3000);
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

  const rangeTooltip = tooltipText ? <Tooltip text={tooltipText} /> : null;

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
            error={rangeTooltip}
          />
        </Label>

        <Label>
          {descSG}
          <Input
            value={getColorValue("s")}
            onChange={(e) => setColorValue(e, "s")}
            error={rangeTooltip}
          />
        </Label>

        <Label>
          {descLB}
          <Input
            value={getColorValue("l")}
            onChange={(e) => setColorValue(e, "l")}
            error={rangeTooltip}
          />
        </Label>

        {rangeTooltip}
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

  border: 2px solid
    ${(props) => (props.error ? props.theme.darkRed : props.theme.darkGray)};
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
  position: relative;
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
