import styled from "styled-components";
import { connect } from "react-redux";
import { useState, useRef } from "react";

import Draggable from "./Draggable";
import { setDeg } from "../actions";

const DegreeOptions = ({ setDeg, degrees }) => {
  const [leftOffset, setLeftOffset] = useState(90);

  const innerBar = useRef(null);
  const degreeBar = useRef(null);

  const setGradientDegrees = (e) => {
    const { left, width } = degreeBar.current.getBoundingClientRect();

    if (e.clientX - left > width) {
      setLeftOffset(width - 6);
      setDeg(360);
    } else if (e.clientX - left < 0) {
      setDeg(0);
      setLeftOffset(-6);
    } else {
      setLeftOffset(e.clientX - left - 6.5);

      setDeg(Math.round((e.clientX - left) / (width / 360)));
    }
  };

  const handleManualDegreeSet = (e) => {
    const { width } = degreeBar.current.getBoundingClientRect();

    if (e.target.value > 360 || e.target.value < 0) {
      setDeg(0);
      setLeftOffset(-6);
    } else {
      setDeg(e.target.value);
      setLeftOffset(((parseInt(e.target.value) - 6.5) / 360) * width);
    }
  };

  return (
    <>
      <Bar ref={degreeBar}>
        <Draggable left={leftOffset} func={setGradientDegrees} />
        <InnerBar ref={innerBar} offset={leftOffset + 12} />
      </Bar>
      <Input
        type="number"
        max="360"
        min="0"
        value={degrees}
        onChange={handleManualDegreeSet}
      />
    </>
  );
};

const Bar = styled.div`
  position: relative;
  grid-area: 6/2/7/3;

  border-radius: 5px;
  background-color: gray;
`;

const InnerBar = styled.div.attrs(({ offset }) => ({
  style: {
    width: offset,
  },
}))`
  position: absolute;
  top: 0px;
  right: 0;
  bottom: 0px;
  left: 0;

  border-radius: 5px;
  background-color: lightgray;
`;

const Input = styled.input`
  grid-area: 7/2/8/3;

  width: 15%;
  min-width: 50px;

  border: 2px solid ${(props) => props.theme.darkGray};
  border-radius: 5px;
  outline: none;
  padding: 5px;

  font-family: ${(props) => props.theme.mainFont};
`;

const mapStateToProps = (state) => {
  return {
    degrees: state.deg,
  };
};

export default connect(mapStateToProps, { setDeg })(DegreeOptions);
