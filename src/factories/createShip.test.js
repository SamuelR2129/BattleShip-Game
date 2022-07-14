import createShip from "./createShip";

describe("attack ship", () => {
  let testCarrier;
  let testSubmarine;
  beforeEach(() => {
    testCarrier = new createShip([0, 1, 2, 3, 4], "carrier");
    testSubmarine = new createShip([12, 13, 14], "submarine");
  });

  it("accepts a hit", () => {
    testCarrier.hit(0);
    expect(testCarrier.hits).toEqual([0]);
  });

  it("accepts a hit", () => {
    testCarrier.hit(0);
    expect(testCarrier.hits).toEqual([0]);
  });

  it("accepts multiple hits", () => {
    testSubmarine.hit(12);
    testSubmarine.hit(13);
    expect(testSubmarine.hits).toEqual([12, 13]);
  });

  it("shows that the boat is not sunk", () => {
    testCarrier.hit(0);
    testCarrier.hit(1);
    expect(testCarrier.isSunk()).toBe(false);
  });

  it("shows that a boat is sunk", () => {
    testSubmarine.hit(12);
    testSubmarine.hit(13);
    testSubmarine.hit(14);
    expect(testSubmarine.isSunk()).toBe(true);
  });
});
