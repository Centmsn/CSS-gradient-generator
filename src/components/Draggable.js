import styled from "styled-components";

const Draggable = ({ func, left }) => {
  const setColor = () => {
    document.addEventListener("mouseup", stopSlide);
    document.addEventListener("mousemove", func);
  };

  const stopSlide = () => {
    document.removeEventListener("mouseup", stopSlide);
    document.removeEventListener("mousemove", func);
  };

  return <Slider onMouseDown={setColor} left={left} />;
};

const Slider = styled.div.attrs(({ left }) => ({
  style: {
    left: left || 0,
  },
}))`
  z-index: 999;
  position: absolute;
  transform: translateY(-10%);
  height: 125%;
  width: 12px;

  border-radius: 5px;
  border: 2px solid black;
  box-shadow: inset 0 0 0 2px white;
  transition: transform 300ms;
  cursor: move;

  &:hover {
    transform: scaleY(1.4) translateY(-10%);
  }
`;

export default Draggable;
