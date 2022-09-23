const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_TIMELINE": {
      return {
        ...state,
        timeline: payload,
      };
    }
    case "SET_PLAYERS": {
      return {
        ...state,
        players: payload,
      };
    }
    case "SET_SHIPS": {
      const { player, ships } = payload;
      const newState = { ...state };
      newState.players[player].ships = ships;
      return { ...newState };
    }
    case "SET_SHIP_HITS": {
      const { playerTag, ship, hits } = payload;
      const freshState = { ...state };
      freshState.players[playerTag].ships.find(
        (vessel) => vessel.shipName === ship.shipName
      ).hits = hits;
      return { ...freshState };
    }
    case "SET_SHIP_ON_BOARD": {
      const { locationArray, player, ship } = payload;
      const newState = { ...state };
      const newBoard = newState.players[player].gameBoardObject.board.map(
        (cell, index) => {
          if (locationArray.includes(index)) {
            cell.hasShip = ship.shipName;
          }
          return cell;
        }
      );
      newState.players[player].gameBoardObject.board = newBoard;
      return { ...newState };
    }
    case "SET_BOARD": {
      const newState = { ...state };
      const { player, board } = payload;
      newState.players[player].gameBoardObject.board = board;
      return { ...newState };
    }
    case "SET_MESSAGE": {
      return {
        ...state,
        message: payload,
      };
    }
    case "RESET_MESSAGE": {
      return {
        ...state,
        message: "",
      };
    }
    case "FIRE_SHOT": {
      const { location, user } = payload;
      const opponent = user === "human" ? "computer" : "player";
      const reState = { ...state };
      reState.players[user].fireAShot(
        location,
        reState.players[opponent].gameBoardObject
      );
      return { ...reState };
    }
    case "SET_TURN": {
      const newState = { ...state };
      newState.turn = payload;
      return { ...newState };
    }
    case "SET_WINNER": {
      const winnerState = { ...state };
      winnerState.winner =
        state.turn === 1 ? state.players.human.playerName : "computer";
      return {
        ...winnerState,
      };
    }
    case "RESET_GAME": {
      const initialState = {
        timeline: "init",
        players: [],
        turn: 0,
        message: "",
        winner: "",
      };
      return {
        ...initialState,
      };
    }
    // for testing
    case "CHEAT_CODE": {
      const cheatState = { ...state };
      cheatState.players.computer.ships.forEach(
        (ship) => (ship.hits = ship.positions)
      );
      return { ...cheatState };
    }
    default:
      return state;
  }
};

export default reducer;
