import shipTypes from "../helpers/shipTypes";

const createShip = (section, name) => {
  const positions = section;
  const shipName = name;
  const hits = [];

  const hit = (index) => {
    hits.push(index);
  };

  const isSunk = () => {
    return positions.every((occupiedCell) => {
      return hits.includes(occupiedCell);
    });
  };

  const placeShip = (gameboard) => {
    for (const position of positions) {
      gameboard.board[position] = { hasShip: true, isShot: false };
    }
  };

  const getShipInfoFromBoard = (props) => {
    return shipTypes
      .find((ship) => ship.name === name)
      .addShipInfoToTypes(props);
  };

  return {
    hit,
    isSunk,
    placeShip,
    getShipInfoFromBoard,
    positions,
    shipName,
    hits,
  };
};

export default createShip;
