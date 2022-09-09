import shipTypes from "./shipTypes";
import createShip from "../factories/createShip";

function placePlayerShip({ player, locationArray, currentShip, dispatch }) {
  const ship = createShip(locationArray, shipTypes[currentShip].name);

  // update board state
  dispatch({
    type: "SET_SHIP_ON_BOARD",
    payload: {
      locationArray,
      player: "human",
      ship: ship,
    },
  });
  // update ship state
  dispatch({
    type: "SET_SHIPS",
    payload: {
      ships: [...player.ships, ship],
      player: "human",
    },
  });
}

export default placePlayerShip;
