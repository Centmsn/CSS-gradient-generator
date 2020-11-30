import styled from "styled-components";

const Tooltip = ({ text }) => {
  return <Tip>{text}</Tip>;
};

const Tip = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  font-family: "Inconsolata", monospace;
  color: gray;
`;

export default Tooltip;
