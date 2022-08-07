import createShip from "./factories/createShip";
import gameBoard from "./factories/createGameBoard";
import "./public/style.scss";
import shipTypes from "./helpers/shipTypes";
import createPlayer from "./factories/createPlayers";

const playerOne = createPlayer("sam");
console.log(playerOne);

const testBoard = gameBoard();
console.log(testBoard);
const placeShipOne = testBoard.findRandomShipLocation(shipTypes[4]);
const shipOne = createShip(placeShipOne, "cruiser");
console.log(shipOne);

shipOne.placeShip(testBoard);

console.log("shipplaced", testBoard);

testBoard.receiveShot(shipOne.positions[0]);
let hasAShipBeenHit = testBoard.checkIfShotHit(shipOne.positions[0]);

console.log(hasAShipBeenHit);
if (hasAShipBeenHit) {
  shipOne.hit(shipOne.positions[0]);
  shipOne.isSunk() ? console.log("shipOne has sunk") : "";
  testBoard.anyShipsLeft(testBoard.board) ? "" : console.log("all gone");
}

testBoard.receiveShot(shipOne.positions[1]);
hasAShipBeenHit = testBoard.checkIfShotHit(shipOne.positions[1]);
console.log(hasAShipBeenHit);
if (hasAShipBeenHit) {
  shipOne.hit(shipOne.positions[1]);
  shipOne.isSunk() ? console.log("shipOne has sunk") : "";
  testBoard.anyShipsLeft(testBoard.board)
    ? ""
    : (playerOne.gameWins = playerOne.increaseGameWins());
}

console.log(playerOne.gameWins);
