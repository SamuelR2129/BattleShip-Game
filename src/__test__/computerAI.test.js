import computerAI from "../helpers/computerAI";
import createPlayer from "../factories/createPlayers";
import createShip from "../factories/createShip";
import shipTypes from "../helpers/shipTypes";

describe("computerAI", () => {
  let player;
  beforeEach(() => {
    player = createPlayer("test");
    shipTypes.forEach((shipType) => {
      const ship = createShip(
        player.gameBoardObject.findRandomShipLocation(shipType),
        shipType.name
      );
      ship.positions.forEach(
        (pos) => (player.gameBoardObject.board[pos].hasShip = ship.shipName)
      );
      player.ships.push(ship);
    });
    for (let i = 0; i < 40; i++) {
      const shot = Math.floor(Math.random() * 100);
      const hitShip = player.ships.find(
        //eslint-disable-next-line
        (ship) => ship.name === player.gameBoardObject.checkIfShotHit(shot)
      );
      if (hitShip) hitShip.hit(shot);
      player.gameBoardObject.board[shot].isShot = true;
    }
  });
  it("returns some shot locations", () => {
    // test 20 times to check for undefined
    let shotsArr = [];
    for (let i = 0; i <= 20; i++) {
      shotsArr.push(computerAI(player));
    }
    expect(shotsArr.every((shot) => shot >= 0 && shot < 100)).toBe(true);
  });
});
