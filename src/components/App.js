import styled, { createGlobalStyle } from "styled-components";

import Options from "./Options";
import Output from "./Output";
import DisplayColor from "./DisplayColor";

const App = () => {
  return (
    <Wrapper>
      <GlobalReset />
      <DisplayColor />
      <Options />
      <Output />
    </Wrapper>
  );
};

const GlobalReset = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Comfortaa', cursive;
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
