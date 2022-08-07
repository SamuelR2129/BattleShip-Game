import createPlayer from "../factories/createPlayers";
import gameBoard from "../factories/createGameBoard";

describe("create a player", () => {
  const gameBoardObj = gameBoard();
  const player = createPlayer("john");
  const increaseGameWins = () => {
    gameWins += 1;
  };
  const fireAShot = (location, board) => {
    if (board.opponentBoard()[location] === "empty") {
      board.receiveShot(location);
    }
  };

  const mocPlayer = {
    gameWins: 0,
    playerName: "john",
    gameBoardObject: gameBoardObj,
    ships: [],
    increaseGameWins: increaseGameWins,
    fireAShot: fireAShot,
  };

  it("initializes a player", () => {
    expect(player.toString()).toEqual(mocPlayer.toString());
  });

  it("increases a game win by 1", () => {
    player.gameWins = player.increaseGameWins();
    expect(player.gameWins).toEqual(1);
  });
});
