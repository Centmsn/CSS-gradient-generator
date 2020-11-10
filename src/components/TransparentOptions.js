import styled from "styled-components";
import { connect } from "react-redux";
import { useState, useRef } from "react";

import Draggable from "./Draggable";

import { setA } from "../actions";
import transparentBg from "../assets/paven.png";

const TransparentOptions = ({ setA, hue, sat, light }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const transparencyBar = useRef(null);

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

  return (
    <Bar hue={hue} sat={sat} light={light} ref={transparencyBar}>
      <InnerBar />
      <Draggable func={setTransparency} left={sliderPosition} />
    </Bar>
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

const mapStateToProps = (state) => {
  const { hue, sat, light } = state.colorPicked;

  return {
    hue,
    sat,
    light,
  };
};

export default connect(mapStateToProps, { setA })(TransparentOptions);
