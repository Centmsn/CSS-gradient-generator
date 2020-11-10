import styled from "styled-components";
import { connect } from "react-redux";

const Output = ({ hue, sat, light, alpha }) => {
  return (
    <CodeOutput>
      <span>
        background: linear-gradient(90deg, hsla({hue}, {sat}%, {light}%, {alpha}
        %)
      </span>
    </CodeOutput>
  );
};

const CodeOutput = styled.div`
  flex-basis: 75%;
  height: 20%;

  border: 2px solid gray;
  border-radius: 5px;
  background-color: whitesmoke;
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

export default connect(mapStateToProps, {})(Output);
