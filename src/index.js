import createShip from "./factorys";
import "./public/style.scss";

const shipOne = createShip(4, "Ship 1");
const shipTwo = createShip(2, "Ship 2");

console.log(shipOne);
shipOne.attack();
shipOne.attack();
shipOne.shipName = "shipOne";
console.log(shipOne);
shipTwo.shipName = "shipTwo";
console.log(shipTwo);
shipTwo.attack();
shipOne.attack();

shipTwo.attack();
