import styled, { createGlobalStyle } from "styled-components";

import DisplayColor from "./DisplayColor";
import Options from "./options/Options";
import Output from "./Output";
import Theme from "../context/Theme";

const App = () => {
  return (
    <Theme>
      <Wrapper>
        <GlobalReset />
        <DisplayColor />
        <Options />
        <Output />
      </Wrapper>
    </Theme>
  );
};

const GlobalReset = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: space-around;
`;

export default App;
