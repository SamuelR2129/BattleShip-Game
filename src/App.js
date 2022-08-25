import React from "react";
import GameWindow from "./components/game_window/GameWindow";
import {
  StyledApp,
  GameWindowContainer,
} from "./components/styled_components/appStyles";
import GameController from "./GameController";

function App() {
  return (
    <GameController>
      <StyledApp>
        <GameWindowContainer>
          <GameWindow />
        </GameWindowContainer>
      </StyledApp>
    </GameController>
  );
}

export default App;
