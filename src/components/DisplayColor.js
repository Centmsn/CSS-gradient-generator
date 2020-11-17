import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect } from "react";

import { convertHslToRgb } from "../helpers";
import { setGradientCode } from "../actions";
import transparentBg from "../assets/paven.png";

const DisplayColor = ({ deg, gradient, code, setGradientCode, mode }) => {
  useEffect(() => {
    const length = Object.keys(gradient).length;
    const output = [];

    for (let i = 0; i < length; i++) {
      if (mode === "hsl") {
        output.push(
          `hsla(${gradient[i].h}, ${gradient[i].s}%, ${gradient[i].l}%, ${gradient[i].a}%) ${gradient[i].w}%`
        );
      } else if (mode === "rgb") {
        output.push(
          `${convertHslToRgb(
            gradient[i].h,
            gradient[i].s,
            gradient[i].l,
            gradient[i].a
          )} ${gradient[i].w}%`
        );
      }
    }

    setGradientCode(`linear-gradient(${deg}deg, ${output.join(", ")})`);
  }, [gradient, deg, setGradientCode, mode]);

  return (
    <ColorOutput code={code}>
      <InnerBg />
    </ColorOutput>
  );
};

const ColorOutput = styled.div.attrs((props) => ({
  style: {
    background: props.code,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 35%;

  background-color: ${(props) => props.background};
`;

const InnerBg = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: white;
  background-image: url(${transparentBg});
`;

const mapStateToProps = (state) => {
  return {
    deg: state.deg,
    gradient: state.gradient,
    code: state.code,
    mode: state.output,
  };
};

export default connect(mapStateToProps, { setGradientCode })(DisplayColor);
