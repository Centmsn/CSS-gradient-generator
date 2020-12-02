import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { setLs, changeActiveCol } from "../../actions";

const LSOptions = ({ active, setLs, changeActiveCol, gradient, hue }) => {
  const [satPosition, setSatPosition] = useState({ x: 0, y: 0 });
  const [colorPickerFlag, setColorPickerFlag] = useState(true);
  const colorSat = useRef(null);
  const satSelector = useRef(null);

  useEffect(() => {
    if (colorPickerFlag) {
      // if active color was removed
      // set active to first color
      if (!gradient[active]) {
        changeActiveCol(0);
        setColorPickerPosition(gradient[0].s, gradient[0].l);

        return;
      }
      setColorPickerPosition();
    }
  }, [active, gradient]);

  const setColorPickerPosition = (
    s = gradient[active].s,
    l = gradient[active].l
  ) => {
    const { width, height } = colorSat.current.getBoundingClientRect();

    // !position setting test
    let posY = height - (height / 100) * l * (1 + s / 100) - 10;
    let posX = (width / 100) * s - 10 - (l > 50 ? (width / 50) * (l - 50) : 0);

    if (posX < -10) {
      posX = -10;
    }

    if (posY < -10) {
      posY = -10;
    }

    setSatPosition({
      x: posX,
      y: posY,
    });
  };

  const setSatLight = (e, flag = false) => {
    const {
      left,
      top,
      width,
      height,
    } = satSelector.current.parentNode.getBoundingClientRect();

    let containerLeft = e.clientX - left;
    let containerTop = e.clientY - top;

    if (containerLeft > width) {
      containerLeft = width;
    } else if (containerLeft < 0) {
      containerLeft = 0;
    }

    if (containerTop > height) {
      containerTop = height;
    } else if (containerTop < 0) {
      containerTop = 0;
    }

    // TODO: refactor sat and light calc
    // !incorrect sat and light calcualtion?
    const xLight = 2 - containerLeft / width;
    const yLight = 100 - (containerTop / height) * 100;

    if (containerLeft > width || containerLeft < 0) {
      const pos = containerLeft < 0 ? -7.5 : width - 7.5;
      setSatPosition({ x: pos, y: containerTop - 7.5 });
      if (containerTop > height) {
        setSatPosition({ x: pos, y: height - 7.5 });
      } else if (containerTop + 7.5 < 0) {
        setSatPosition({ x: pos, y: -7.5 });
      }
    } else if (containerTop > height || containerTop < 0) {
      const pos = containerTop < 0 ? -7.5 : height - 7.5;
      setSatPosition({ x: containerLeft - 7.5, y: pos });
    } else {
      setSatPosition({ x: containerLeft - 7.5, y: containerTop - 7.5 });
    }

    setLs((containerLeft / width) * 100, (yLight / 2) * xLight);

    // prevent UseEffect hook from changing position
    // when clicked instead of dragging
    if (flag) {
      setColorPickerFlag(false);

      setTimeout(() => {
        setColorPickerFlag(true);
      });
    }
  };

  const startDrag = () => {
    setColorPickerFlag(false);
    document.addEventListener("mousemove", setSatLight);
    document.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    setColorPickerFlag(true);
    document.removeEventListener("mousemove", setSatLight);
    document.removeEventListener("mouseup", stopDrag);
  };

  return (
    <ColorPicker deg={hue} ref={colorSat} onClick={(e) => setSatLight(e, true)}>
      <ColorPickerSelector
        onMouseDown={startDrag}
        ref={satSelector}
        left={satPosition.x}
        top={satPosition.y}
      />
      <BlackGradient />
    </ColorPicker>
  );
};

const ColorPicker = styled.div.attrs(({ deg }) => ({
  style: {
    background: `linear-gradient(
        90deg,
        hsl(360, 0%, 100%) 0%,
        hsl(${deg}, 100%, 50%) 100%
      )`,
  },
}))`
  position: relative;
  grid-area: 2/1/7/2;

  border-radius: 5px;
`;

const BlackGradient = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  border-radius: 5px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 8%,
    rgba(0, 0, 0, 1) 90%
  );
`;

const ColorPickerSelector = styled.div.attrs((props) => ({
  style: {
    left: props.left,
    top: props.top,
  },
}))`
  position: absolute;
  z-index: 1000;

  width: 20px;
  height: 20px;

  border: 2px solid white;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px black;
  cursor: pointer;
`;

const mapStateToProps = (state) => {
  const { colId, gradient } = state;
  return {
    gradient,
    active: colId,
    hue: state.colorPicked.hue,
  };
};

export default connect(mapStateToProps, { setLs, changeActiveCol })(LSOptions);
