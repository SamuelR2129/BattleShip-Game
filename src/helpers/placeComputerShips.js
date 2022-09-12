import shipTypes from "./shipTypes";
import createShip from "../factories/createShip";
import gameBoard from "../factories/createGameBoard";

const placeComputerShips = (dispatch, gameBoardObject) => {
  // create a temporary board to check collisions and use single dispatch
  // we pass in our own board so we can use the methods on the class
  const tempBoard = gameBoard(gameBoardObject.board);
  const ships = [];

  shipTypes.forEach((shipType) => {
    const ship = createShip(
      tempBoard.findRandomShipLocation(shipType),
      shipType.name
    );
    ship.positions.forEach(
      (pos) => (tempBoard.board[pos].hasShip = ship.shipName)
    );
    ships.push(ship);
  });

  // update board state
  dispatch({
    type: "SET_BOARD",
    payload: {
      player: "computer",
      board: tempBoard.board,
    },
  });
  // update ship state
  dispatch({
    type: "SET_SHIPS",
    payload: {
      ships,
      player: "computer",
    },
  });
};

export default placeComputerShips;
