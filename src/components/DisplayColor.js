import styled from "styled-components";
import { connect } from "react-redux";

import transparentBg from "../assets/paven.png";

const DisplayColor = ({ deg, gradient }) => {
  const generateGradient = () => {
    const length = Object.keys(gradient).length;
    const output = [];
    for (let i = 0; i < length; i++) {
      output.push(
        `hsla(${gradient[i].h}, ${gradient[i].s}%, ${gradient[i].l}%, ${gradient[i].a}%) ${gradient[i].w}%`
      );
    }

    return `linear-gradient(${deg}deg, ${output.join(",")})`;
  };

  return (
    <ColorOutput generateGradient={generateGradient}>
      <InnerBg />
    </ColorOutput>
  );
};

const ColorOutput = styled.div.attrs((props) => ({
  style: {
    background: props.generateGradient(),
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
  const { hue, sat, light, alpha } = state.colorPicked;

  return {
    deg: state.deg,
    gradient: state.gradient,
  };
};

export default connect(mapStateToProps, {})(DisplayColor);
