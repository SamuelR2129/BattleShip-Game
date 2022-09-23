import React, { useContext, useState } from "react";
import {
  GameBoardGrid,
  Cell,
  SetupGridContainer,
  WatersContainer,
} from "../styledComponents/gameControllerStyles";
import findShipPlacement from "../../helpers/findShipPlacement";
import ShotMarker from "../icons/ShotMarker";
import computerTurns from "../../helpers/computerTurns";
import checkWinner from "../../helpers/checkWinner";
import humanTurn from "../../helpers/humanTurn";
import { store } from "../../GameController";

function EnemyWatersGrid() {
  const { state, dispatch } = useContext(store);
  const { turn, winner } = state;
  const [shotTimeout, setShotTimeout] = useState(false);
  const { players } = state;
  const computer = players.computer;
  const computerBoard = computer.gameBoardObject;
  const playerBoard = players.human.gameBoardObject;

  const handlePlayerShot = (index) => {
    if (!shotTimeout && !winner) {
      // ignore shots while HUD is sending message
      setShotTimeout(true);
      // clear message HUD
      dispatch({ type: "RESET_MESSAGE" });
      humanTurn(
        {
          dispatch,
          index,
          computer,
          computerTurns,
          players,
          checkWinner,
        },
        {
          playerBoard,
          setShotTimeout,
          checkWinner,
          computer,
          dispatch,
          players,
        }
      );
    }
  };

  // create a map to populate the grid
  const fillCells = () => {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push([i]);
    }
    return computerBoard.opponentBoard().map((cell, index) => {
      return (
        <Cell
          key={index}
          board="enemy"
          cursor={cell === "empty" ? "crosshair" : "not-allowed"}
          onClick={() => {
            if (turn === 0 && cell === "empty") {
              handlePlayerShot(index);
            }
          }}
          shot={cell !== "empty"}
        >
          {cell !== "empty" && <ShotMarker hit={cell === "hit" ? "hit" : ""} />}
        </Cell>
      );
    });
  };

  return (
    <WatersContainer row="3">
      <SetupGridContainer>
        <GameBoardGrid>
          {computer.ships.map((ship) => {
            if (ship.isSunk(ship.hits)) {
              const placement = findShipPlacement(ship, computerBoard.board);
              const shipProps = {
                start: placement.start,
                axis: placement.axis,
                sunk: ship.isSunk(ship.hits),
              };
              return ship.getShipInfoFromBoard(shipProps);
            } else {
              return null;
            }
          })}
        </GameBoardGrid>
      </SetupGridContainer>
      <SetupGridContainer>
        <GameBoardGrid>{fillCells()}</GameBoardGrid>
      </SetupGridContainer>
    </WatersContainer>
  );
}

export default EnemyWatersGrid;
