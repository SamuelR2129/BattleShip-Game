import React, { useState, useEffect, useContext } from "react";
import {
  SetupWindow,
  SetupTitle,
  AxisButton,
  GridOverlayContainer,
} from "../styledComponents/gameControllerStyles";
import ShipPlacementGrid from "./ShipPlacementGrid";
import CellSelectorGrid from "./CellSelectorGrid";
import shipTypes from "../../helpers/shipTypes";
import placePlayerShips from "../../helpers/placePlayerShips";
import placeComputerShips from "../../helpers/placeComputerShips";
import { store } from "../../GameController";

function GameSetup({ dismount, setDismount }) {
  const { state, dispatch } = useContext(store);
  const { players } = state;
  const [currentShip, setCurrentShip] = useState(0);
  const [axis, setAxis] = useState("x");
  const [loading, setLoading] = useState(true);

  // using a new loading state to avoid race conditions between the render
  // and setDismount. this causes the animation to load incorrectly.
  // this method allows the component to always render with
  // the animation starting from being completely faded
  useEffect(() => {
    if (loading) {
      setDismount(false);
      setLoading(false);
    }
  }, [setDismount, loading]);

  const handlePlaceShip = (location) => {
    const { gameBoardObject } = players.human;
    const locationArray = gameBoardObject.createLocationArray(
      location,
      shipTypes[currentShip],
      axis
    );
    // returns true if there are no collisions
    if (gameBoardObject.checkCollisions(locationArray)) {
      placePlayerShips({
        player: players.human,
        locationArray,
        currentShip,
        dispatch,
      });
      // check if this is the last ship to be placed
      if (currentShip >= 4) {
        // Computer will place ships
        placeComputerShips(dispatch, state.players.computer.gameBoardObject);
        setDismount(true);
        dispatch({ type: "SET_TIMELINE", payload: "game start" });
      } else {
        setCurrentShip(currentShip + 1);
      }
    }
  };

  return (
    !loading && (
      <SetupWindow style={{ animation: dismount ? "fadeout 2s" : "fadein 2s" }}>
        <SetupTitle>
          {players.human.playerName}, Place Your {shipTypes[currentShip].name}:
        </SetupTitle>
        <AxisButton onClick={() => setAxis(axis === "x" ? "y" : "x")}>
          AXIS: {axis}
        </AxisButton>
        <GridOverlayContainer>
          {/* for ship placement */}
          <ShipPlacementGrid />
          {/* cells for click handlers */}
          <CellSelectorGrid
            currentShip={currentShip}
            axis={axis}
            handlePlaceShip={handlePlaceShip}
          />
        </GridOverlayContainer>
      </SetupWindow>
    )
  );
}

export default GameSetup;
