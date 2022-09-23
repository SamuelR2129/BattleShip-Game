import computerAI from "./computerAI.js";

const computerTurns = ({
  playerBoard,
  setShotTimeout,
  checkWinner,
  computer,
  dispatch,
  players,
}) => {
  // prevent from running when locked for win conditions
  if (!checkWinner(players)) {
    // computer waits for its turn, then fires
    // a little fake immersion
    setTimeout(() => {
      dispatch({
        type: "SET_MESSAGE",
        payload: "Your opponent is aiming...",
      });
    }, 1000);

    setTimeout(() => {
      const shotLocation = computerAI(players.human);
      if (playerBoard.checkIfShotHit(shotLocation)) {
        const newShips = { ...players.human }.ships;
        const hitShip = newShips.find(
          (ship) => ship.shipName === playerBoard.checkIfShotHit(shotLocation)
        );
        hitShip.hit(shotLocation);
        // update hits on human ships
        dispatch({
          type: "SET_SHIP_HITS",
          payload: { playerTag: "human", ship: hitShip, hits: hitShip.hits },
        });
        if (hitShip.isSunk(hitShip.hits)) {
          dispatch({
            type: "SET_MESSAGE",
            payload: `The enemy fires a shot into your waters ...... they sunk your ${hitShip.shipName}!`,
          });
        } else {
          dispatch({
            type: "SET_MESSAGE",
            payload:
              "The enemy fires a shot into your waters ...... it's a hit!",
          });
        }
      } else {
        dispatch({
          type: "SET_MESSAGE",
          payload: "The enemy fires a shot into your waters ...... and misses.",
        });
      }
      // fire on that spot after message populates
      setTimeout(() => {
        computer.fireAShot(shotLocation, playerBoard);
        dispatch({ type: "SET_TURN", payload: 0 });
        setShotTimeout(false);
      }, 1800);
    }, 2600);
  }
};

export default computerTurns;
