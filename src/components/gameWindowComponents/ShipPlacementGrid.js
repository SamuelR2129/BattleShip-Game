import React, { useContext } from "react";
import findShipPlacement from "../../helpers/findShipPlacement";
import {
  GameBoardGrid,
  SetupGridContainer,
} from "../styledComponents/gameControllerStyles";
import { store } from "../../GameController";

function ShipPlacementGrid() {
  const { state } = useContext(store);
  const { ships, gameBoardObject } = state.players.human;
  const { board } = gameBoardObject;

  return (
    <SetupGridContainer>
      <GameBoardGrid>
        {ships.map((ship) => {
          if (findShipPlacement(ship, board)) {
            const placement = findShipPlacement(ship, board);
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
  );
}

export default ShipPlacementGrid;
