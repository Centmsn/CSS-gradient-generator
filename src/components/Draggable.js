import styled from "styled-components";

const Draggable = ({ func, clickFunc, left, active, wide, color }) => {
  const setColor = () => {
    document.addEventListener("mouseup", stopSlide);
    document.addEventListener("mousemove", func);
  };

  const stopSlide = () => {
    document.removeEventListener("mouseup", stopSlide);
    document.removeEventListener("mousemove", func);
  };

  return (
    <Slider
      onMouseDown={setColor}
      onClick={clickFunc}
      left={left}
      active={active}
      wide={wide}
      color={color}
    />
  );
};

const Slider = styled.div.attrs(({ left, color }) => ({
  style: {
    left: left || 0,
    backgroundColor: color,
  },
}))`
  z-index: 999;
  position: absolute;
  transform: translateY(-10%);
  height: 125%;
  width: ${(props) => (props.wide ? "20px" : "12px")};

  border-radius: 5px;
  border: 2px solid black;
  box-shadow: ${(props) =>
    props.active ? "0 0 0px 2px black" : "inset 0 0 0 2px white"};
  transition: transform 300ms;
  cursor: move;

  &:hover {
    transform: scaleY(1.4) translateY(-10%);
  }
`;

export default Draggable;
