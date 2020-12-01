import styled from "styled-components";

const Draggable = ({ func, clickFunc, left, active, wide, color }) => {
  const startDrag = () => {
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("mousemove", func);
  };

  const stopDrag = () => {
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("mousemove", func);
  };

  return (
    <Slider
      onMouseDown={startDrag}
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
  border: 2px solid white;

  box-shadow: 0 0 3px 0 black,
    ${({ active }) => (active ? "0 0 0 2px black" : "0 0 0 1px black")};
  cursor: move;
`;

export default Draggable;
