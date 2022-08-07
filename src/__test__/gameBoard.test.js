import gameBoard from "../factories/createGameBoard";
import shipTypes from "../helpers/shipTypes";

describe("Gameboard functions", () => {
  let testBoard;
  testBoard = gameBoard();

  it("initializes a gameboard with the appropriate amount of cells", () => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push({ hasShip: false, isShot: false });
    }
    expect(testBoard.board).toEqual(arr);
  });

  it("updates a cell when receiving a shot", () => {
    testBoard.receiveShot(25);
    expect(testBoard.board[25].isShot).toBe(true);
  });

  it("responds to a miss", () => {
    expect(testBoard.checkIfShotHit(25)).toBe(false);
  });

  it("confirms a hit", () => {
    testBoard.board[25].hasShip = true;
    expect(testBoard.checkIfShotHit(25)).toBe(true);
  });

  it("rejects ship placement that collides with other ships", () => {
    testBoard.board[12].hasShip = "carrier";
    expect(testBoard.checkCollisions([2, 12, 22, 32])).toBe(false);
  });

  it("rejects ship placement that runs through map edge on x axis", () => {
    expect(testBoard.checkCollisions([8, 9, 10, 11, 12])).toBe(false);
  });

  it("rejects ship placement that runs through map edge on y axis", () => {
    expect(testBoard.checkCollisions([78, 88, 98, 108])).toBe(false);
  });

  it("returns the location array of a ship", () => {
    expect(testBoard.createLocationArray(23, shipTypes[4], "y")).toEqual([
      23, 33,
    ]);
  });

  it("tells you when ships are all gone or not there", () => {
    expect(testBoard.anyShipsLeft(testBoard.board)).toEqual(false);
  });

  it("tells you when ships are still alive", () => {
    testBoard.board[23] = { hasShip: true, isShot: false };
    expect(testBoard.anyShipsLeft(testBoard.board)).toEqual(true);
  });

  it("renders the opponent version", () => {
    const arr = [];
    const testBoard = gameBoard();
    for (let i = 0; i < 100; i++) {
      arr.push("empty");
    }
    testBoard.board[23] = { hasShip: true, isShot: true };
    testBoard.board[79] = { hasShip: false, isShot: true };
    arr[23] = "hit";
    arr[79] = "miss";
    const enemyBoard = testBoard.opponentBoard();
    expect(enemyBoard).toEqual(arr);
  });
});
