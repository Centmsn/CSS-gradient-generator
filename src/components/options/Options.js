import styled from "styled-components";
import { connect } from "react-redux";

import ColorHue from "./ColorHue";
import ColorsList from "./ColorsList";
import DegreeOptions from "./DegreeOptions";
import GradientOptions from "./GradientOptions";
import LSOptions from "./LSOptions";
import TransparentOptions from "./TransparentOptions";
import { setLs, switchToHsl, switchToRgb } from "../../actions";

const Options = ({ mode, switchToHsl, switchToRgb }) => {
  const handleModeChange = () => {
    if (mode === "hsl") {
      switchToRgb();
    } else {
      switchToHsl();
    }
  };

  return (
    <Settings>
      <Button onClick={handleModeChange}>
        Convert to {mode === "hsl" ? "RGB" : "HSL"}
      </Button>
      <LSOptions />
      <ColorHue />
      <TransparentOptions />
      <DegreeOptions />
      <GradientOptions />
      <ColorsList />
    </Settings>
  );
};

const Settings = styled.div`
  z-index: 999;
  margin-top: 20vh;
  flex-basis: 75%;
  height: 60%;

  display: grid;
  gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(10, 1fr);

  border: 4px solid ${(props) => props.theme.darkBlue};
  border-radius: 10px;
  background-color: white;
  padding: 10px;
`;

const Button = styled.button`
  grid-area: 1/1/2/2;

  background: none;
  border: 2px solid ${(props) => props.theme.darkBlue};
  border-radius: 5px;
  outline: none;

  font-size: 1.25rem;
  font-family: ${(props) => props.theme.mainFont};

  transition: 300ms;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.darkBlue};
    color: white;
  }
`;

const mapStateToProps = (state) => {
  return {
    mode: state.output,
  };
};

export default connect(mapStateToProps, {
  setLs,
  switchToRgb,
  switchToHsl,
})(Options);
