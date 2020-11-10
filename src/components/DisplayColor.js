import styled from "styled-components";
import { connect } from "react-redux";

import transparentBg from "../assets/paven.png";

const DisplayColor = ({ hue, sat, light, alpha }) => {
  return (
    <ColorOutput hue={hue} sat={sat} light={light} alpha={alpha}>
      <InnerBg />
    </ColorOutput>
  );
};

const ColorOutput = styled.div.attrs((props) => ({
  style: {
    background: `linear-gradient(90deg, hsla(${props.hue}, ${props.sat}%, ${props.light}%, ${props.alpha}%) 16%, rgba(13,101,191,1) 62%)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;

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
    hue,
    sat,
    light,
    alpha,
  };
};

export default connect(mapStateToProps, {})(DisplayColor);
