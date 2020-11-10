import styled from "styled-components";
import { useState } from "react";

import Draggable from "./Draggable";

const DegreeOptions = () => {
  const [degrees, setDegrees] = useState(90);

  const setGradientDegrees = () => {};

  return (
    <Bar>
      <Draggable left={degrees} func={setGradientDegrees} />
    </Bar>
  );
};

const Bar = styled.div`
  position: relative;
  grid-area: 6/2/7/3;

  border-radius: 5px;
  background-color: gray;
`;

const InnerBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default DegreeOptions;
