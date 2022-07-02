import createShip from "./factorys";

describe("attack ship", () => {
  const SHIP_ONE = createShip(4, "Ship 1");
  test("attack takes one health off", () => {
    expect(SHIP_ONE.attack).toBe(SHIP_ONE.health == 3);
  });
});
