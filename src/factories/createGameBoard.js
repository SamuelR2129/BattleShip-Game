const gameBoard = () => {
  const init = () => {
    for (let i = 0; i < 100; i++) {
      board.push({ hasShip: false, isShot: false });
    }
  };

  let board = [];
  if (!board.length) init();

  const receiveShot = (location) => {
    board[location].isShot = true;
  };

  const checkIfShotHit = (location) => {
    // return true for hit, false for miss
    return board[location].hasShip;
  };

  const createLocationArray = (location, ship, axis) => {
    const locationArray = [];
    for (let i = 0; i < ship.length; i++) {
      axis === "x"
        ? locationArray.push(location + i)
        : locationArray.push(location + i * 10);
    }
    return locationArray;
  };

  const checkCollisions = (locationArray) => {
    // on x axis, if a ship shares this cell with the next, there is a wall collision
    const collisions = [9, 19, 29, 39, 49, 59, 69, 79, 89];
    if (locationArray.some((loc) => !board[loc])) {
      // check if ship placement exceeds board boundaries, which covers y axis
      return false;
    } else if (locationArray.some((loc) => board[loc].hasShip)) {
      // check for collisions with other ships
      return false;
    } else if (
      collisions.some((num) => {
        // see comment on collisions array
        return [num, num + 1].every((combination) =>
          locationArray.includes(combination)
        );
      })
    ) {
      return false;
    } else {
      return true;
    }
  };

  const findRandomShipLocation = (ship) => {
    // get a random axis
    const randomAxis = () => ["x", "y"][Math.floor(Math.random() * 2)];
    // return a location array that will fit this ship
    const findSuitableLocation = (axis) => {
      const possibleLocationArrays = [];
      for (let i = 0; i < 100 - ship.length; i++) {
        // make every possible location the ship can exist as an array
        let locationArray = [];
        if (axis === "x") {
          for (let count = 0; count < ship.length; count++) {
            locationArray.push(i + count);
          }
        } else {
          for (let count = 0; count < ship.length; count++) {
            locationArray.push(i + count * 10);
          }
        }
        // test if this location will work, if so, push to the collection of possibilities
        if (checkCollisions(locationArray)) {
          possibleLocationArrays.push(locationArray);
        }
      }
      // return a random choice
      return possibleLocationArrays[
        Math.floor(Math.random() * possibleLocationArrays.length)
      ];
    };
    return findSuitableLocation(randomAxis());
  };

  // this returns a version of the game board that represents what the opponent is allowed to see
  const opponentBoard = () => {
    return board.map((cell) => {
      return cell.isShot && cell.hasShip
        ? "hit"
        : cell.isShot
        ? "miss"
        : "empty";
    });
  };

  return {
    board,
    receiveShot,
    checkIfShotHit,
    createLocationArray,
    checkCollisions,
    findRandomShipLocation,
    opponentBoard,
  };
};

export default gameBoard;
