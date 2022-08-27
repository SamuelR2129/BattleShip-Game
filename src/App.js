import React from "react";
import GameWindow from "./components/gameWindowComponents/GameWindow";
import {
  StyledApp,
  GameWindowContainer,
} from "./components/styledComponents/appStyles";
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
