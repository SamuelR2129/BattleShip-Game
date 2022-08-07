import gameBoard from "./createGameBoard";

const createPlayer = (name) => {
  let gameWins = 0;
  const playerName = name;
  const gameBoardObject = gameBoard();
  const ships = [];

  const increaseGameWins = () => {
    return (gameWins = gameWins + 1);
  };

  const fireAShot = (location, board) => {
    if (board.opponentBoard()[location] === "empty") {
      board.receiveShot(location);
    }
  };

  return {
    playerName,
    gameWins,
    increaseGameWins,
    gameBoardObject,
    ships,
    fireAShot,
  };
};

export default createPlayer;
