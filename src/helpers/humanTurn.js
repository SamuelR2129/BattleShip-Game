// callback refers to the computer turn, so that it only executes when this function completes
const humanTurn = (
  { dispatch, index, computer, computerTurns, players, checkWinner },
  computerTurnArgs
) => {
  // don't allow if there's a winner
  if (!checkWinner(players)) {
    const computerBoard = computer.gameBoardObject;
    setTimeout(() => {
      if (computerBoard.checkIfShotHit(index)) {
        const newShips = [...computer.ships];
        const hitShip = newShips.find(
          (ship) => ship.shipName === computerBoard.checkIfShotHit(index)
        );
        hitShip.hit(index);
        dispatch({
          type: "SET_SHIP_HITS",
          payload: { playerTag: "computer", ship: hitShip, hits: hitShip.hits },
        });

        if (hitShip.isSunk(hitShip.hits)) {
          dispatch({
            type: "SET_MESSAGE",
            payload: `You fire a shot into enemy waters ...... you sunk their ${hitShip.shipName}!`,
          });
        } else {
          dispatch({
            type: "SET_MESSAGE",
            payload: "You fire a shot into enemy waters ...... it's a hit!",
          });
        }
      } else {
        dispatch({
          type: "SET_MESSAGE",
          payload: "You fire a shot into enemy waters ...... and miss.",
        });
      }
    }, 0);

    // give time for message to populate
    setTimeout(() => {
      dispatch({
        type: "FIRE_SHOT",
        payload: {
          user: "human",
          location: index,
        },
      });
      dispatch({ type: "SET_TURN", payload: 1 });
      computerTurns({
        ...computerTurnArgs,
      });
    }, 1700);
  }
};

export default humanTurn;
