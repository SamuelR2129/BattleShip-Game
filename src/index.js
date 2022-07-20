import createShip from "./factories/createShip";
import gameBoard from "./factories/createGameBoard";
import "./public/style.scss";
import shipTypes from "./helpers/shipTypes";

const testBoard = gameBoard();
console.log(testBoard);
const placeShipOne = testBoard.findRandomShipLocation(shipTypes[4]);
const shipOne = createShip(placeShipOne, "cruiser");
console.log(shipOne);

for (const position of shipOne.positions) {
  testBoard.board[position] = { hasShip: true, isShot: false };
}

console.log(testBoard);

testBoard.receiveShot(shipOne.positions[0]);
let hasAShipBeenHit = testBoard.checkIfShotHit(shipOne.positions[0]);
console.log(hasAShipBeenHit);
if (hasAShipBeenHit) {
  shipOne.hit(shipOne.positions[0]);
}

testBoard.receiveShot(shipOne.positions[1]);
hasAShipBeenHit = testBoard.checkIfShotHit(shipOne.positions[1]);
console.log(hasAShipBeenHit);
if (hasAShipBeenHit) {
  shipOne.hit(shipOne.positions[1]);
}

const hasShipOneSunk = shipOne.isSunk();
console.log(hasShipOneSunk);
if (hasShipOneSunk) {
  console.log("shipOne has sunk");
} else {
  console.log("all good");
}
