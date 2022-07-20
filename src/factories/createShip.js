const createShip = (section, name) => {
  const positions = section;
  const shipName = name;
  const hits = [];

  const hit = (index) => {
    hits.push(index);
  };

  const isSunk = () => {
    return positions.every((occupiedCell) => {
      return hits.includes(occupiedCell);
    });
  };

  return { hit, isSunk, positions, shipName, hits };
};

export default createShip;
