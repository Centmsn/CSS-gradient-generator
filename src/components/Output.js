import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setActiveCol } from "../actions";

const Output = (props) => {
  const { hue, sat, light, alpha, deg, setActiveCol, active, code } = props;

  useEffect(() => {
    setActiveCol({ index: active, h: hue, s: sat, l: light, a: alpha });
  }, [hue, sat, light, alpha, deg]);

  return (
    <CodeOutput>
      <span>background: {code}</span>
    </CodeOutput>
  );
};

const CodeOutput = styled.div`
  flex-basis: 75%;
  height: 10%;

  border-radius: 5px;
  background-color: ${(props) => props.theme.darkBlue};
  color: white;

  font-family: ${(props) => props.theme.mainFont};
  padding: 10px;
  overflow-y: auto;
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
    code: state.code,
  };
};

export default connect(mapStateToProps, { setActiveCol })(Output);
