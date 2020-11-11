import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setActiveCol } from "../actions";

const Output = ({ hue, sat, light, alpha, deg, setActiveCol, active }) => {
  useEffect(() => {
    setActiveCol({ index: active, h: hue, s: sat, l: light, a: alpha });
  }, [hue, sat, light, alpha, deg]);

  return (
    <CodeOutput>
      <span>
        background: linear-gradient({deg}deg, hsla({hue}, {sat}%, {light}%,{" "}
        {alpha}
        %)
      </span>
    </CodeOutput>
  );
};

const CodeOutput = styled.div`
  flex-basis: 75%;
  height: 10%;

  border: 2px solid gray;
  border-radius: 5px;
  background-color: white;

  padding: 10px;
`;

const mapStateToProps = (state) => {
  const { hue, sat, light, alpha } = state.colorPicked;

  return {
    hue,
    sat,
    light,
    alpha,
    deg: state.deg,
    active: state.colId,
  };
};

export default connect(mapStateToProps, { setActiveCol })(Output);
