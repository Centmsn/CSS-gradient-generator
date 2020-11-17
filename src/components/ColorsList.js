import styled from "styled-components";
import { connect } from "react-redux";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { removeGradientCol, changeActiveCol } from "../actions";

const ColorsList = ({
  gradient,
  index,
  removeGradientCol,
  changeActiveCol,
}) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);

  const removeColor = (index) => {
    if (Object.keys(gradient).length <= 2) {
      setDisplayTooltip(true);

      setTimeout(() => setDisplayTooltip(false), 3000);
      return;
    }

    removeGradientCol(index);
  };

  const changeActive = (index) => {
    changeActiveCol(index);
  };

  const renderList = () => {
    const length = Object.keys(gradient).length;
    const list = [];

    for (let i = 0; i < length; i++) {
      const color = `hsla(${gradient[i].h}, ${gradient[i].s}%, ${gradient[i].l}%, ${gradient[i].a}%)`;
      const active = i === index ? true : false;
      list.push(
        <ListEl key={i}>
          <ListColor
            color={color}
            active={active}
            onClick={() => changeActive(i)}
          />
          <Btn onClick={() => removeColor(i)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Btn>
        </ListEl>
      );
    }

    return list;
  };

  const tooltip = displayTooltip ? (
    <ListEl>Gradient must have at least 2 colors</ListEl>
  ) : null;

  return (
    <List>
      <ListTitle>Gradient colors</ListTitle>
      <ul>{renderList()}</ul>
      {tooltip}
    </List>
  );
};

const List = styled.div`
  grid-area: 1/3/8/4;

  border-radius: 5px;

  background-color: ${(props) => props.theme.darkBlue};
  color: white;
  font-family: ${(props) => props.theme.mainFont};
  overflow-y: auto;
`;

const ListTitle = styled.h3`
  text-align: center;
  user-select: none;
`;

const ListEl = styled.li`
  margin: 10px 0;

  display: flex;
  justify-content: space-around;
`;

const ListColor = styled.div`
  transform: ${({ active }) => (active ? "translateX(10%)" : null)};

  flex-basis: 65%;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: inset 0 0 0 3px white;

  background-color: ${(props) => props.color};
  transition: transform 300ms;
  cursor: pointer;
`;

const Btn = styled.button`
  position: relative;
  flex-basis: 15%;
  min-height: 25px;

  border: none;
  outline: none;
  background: none;
  color: white;

  font-size: 1.5rem;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    color: red;
  }
`;

const mapStateToProps = (state) => {
  return {
    index: state.colId,
    gradient: state.gradient,
  };
};

export default connect(mapStateToProps, { removeGradientCol, changeActiveCol })(
  ColorsList
);
