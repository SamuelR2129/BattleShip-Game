import React, { useState, useContext, useEffect } from "react";
import Init from "./Init";
import GameSetup from "./GameSetup";
import GameStart from "./GameStart";
import WinnerScreen from "./WinnerScreen";
import { store } from "../../GameController";
import { MainWindow } from "../styledComponents/gameControllerStyles";

const GameWindow = () => {
  const state = useContext(store);
  const { timeline, winner } = state;
  const [dismount, setDismount] = useState(false);

  // cancel animation coming into this component
  useEffect(() => {
    setDismount(false);
  }, [setDismount]);

  // to avoid passing a setState directly, pass this helper function
  const setDismountProp = (state) => {
    setDismount(state);
  };

  // conditionally render based on the app state "timeline"
  const renderChild = (timeline) => {
    if (timeline === "init") {
      return <Init dismount={dismount} setDismount={setDismountProp} />;
    } else if (timeline === "setup") {
      return <GameSetup dismount={dismount} setDismount={setDismountProp} />;
    } else if (winner) {
      return <WinnerScreen playBgSound={playBgSound} />;
    } else if (!winner) {
      return <GameStart playSound={playSound} setDismount={setDismount} />;
    } else {
      null;
    }
  };

  return <MainWindow>{renderChild(timeline)}</MainWindow>;
};

export default GameWindow;
