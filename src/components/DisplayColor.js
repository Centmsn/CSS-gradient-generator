import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect } from "react";

import { convertHslToRgb } from "../helpers";
import { setGradientCode } from "../actions";
import transparentBg from "../assets/paven.png";

const DisplayColor = (props) => {
  const { deg, gradient, code, output, order, setGradientCode } = props;

  useEffect(() => {
    const length = Object.keys(gradient).length;
    const result = [];

    // !gradient updates first and has more keys than order
    for (let i = 0; i < length; i++) {
      if (!gradient[order[i]]) {
        return;
      }
      const { h, s, l, a, w } = gradient[order[i]];

      if (output === "hsl") {
        result.push(`hsla(${h}, ${s}%, ${l}%, ${a}%) ${w}%`);
      } else if (output === "rgb") {
        result.push(`${convertHslToRgb(h, s, l, a)} ${w}%`);
      }
    }

    setGradientCode(`linear-gradient(${deg}deg, ${result.join(", ")})`);
  }, [gradient, deg, setGradientCode, output, order]);

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
  const { deg, gradient, code, output, order } = state;

  return {
    deg,
    gradient,
    code,
    output,
    order,
  };
};

export default connect(mapStateToProps, { setGradientCode })(DisplayColor);
